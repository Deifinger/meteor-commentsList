import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import { Comments } from '../../api/comments/comments.js';

// Components used in the template
import '../components/comments-form.js';
import '../components/comments-item.js';
import '../components/auth-form.js';

import './comments.html';

import {
    insert,
    updateText
} from '../../api/comments/methods.js';

Template.commentsPage.onCreated(function commentsPageOnCreated() {

    // Create reactive variable for updating date at comments
    // Used on ../components/comments-item.js
    window.dateTick = new ReactiveVar(0);
    Meteor.defer(function () {
        window.dateTick = new ReactiveVar(false);
        this.dateTimerId = Meteor.setInterval(() => {
            window.dateTick.set(!window.dateTick.get());
        }, 60000);
    });

    this.state = new ReactiveDict();
    this.state.setDefault({
        commentIdWithForm: null,
        editingCommentId: null
    });

    this.addComment = (text, parentId = "0") => {
        text = text.trim();
        if (text) {
            insert.call({ text, parentId}, (msg) => {
                console.log(msg);
            });
        }
    };

    this.updateComment = (commentId, text) => {
        text = text.trim();
        if (text) {
            updateText.call({ commentId, text }, (msg) => {
                console.log(msg);
            });
        }
    };

    this.getCommentForm = () => {
        return this.$commentForm ? this.$commentForm : this.$commentForm = $('.comments-form:first');
    };

    this.getReplyForm = () => {
        // TODO: replace code below to event onSubscriptionReady
        if(!this.$replyForm) {
            let $commentForm = this.getCommentForm();
            this.$replyForm = $commentForm.clone().addClass('reply-form');
            this.hideReplyForm();

            $commentForm.after(this.$replyForm);
        }
        return this.$replyForm;
    };
    this.hideReplyForm = () => {
        this.$replyForm.addClass('uk-hidden');
        this.state.set('commentIdWithForm', null);
    };
    this.showReplyForm = () => {
        this.$replyForm.removeClass('uk-hidden');
    };

    this.autorun(function () {});

});

Template.commentsPage.onDestroyed(function () {
    Meteor.clearInterval(this.dateTimerId);
});

Template.commentsPage.helpers({
    commentsList() {
        return Comments.find({ parentId: "0" }, {sort: {date: -1}});
    },

    commentsItemArgs(comment) {
        const instance = Template.instance();
        return {
            comment,
            editingCommentId: instance.state.get('editingCommentId')
        }
    },

    commentFormArgs() {
        return {
            isEditComment: false,
            defaultText: ""
        };
    }
});

Template.commentsPage.events({
    'submit .comments-form, keypress .comments-form, click .comments-form-send'(event, instance) {
        // if pressed key is not enter - return
        if(event.keyCode && event.keyCode != 13) return true;

        let $target = $(event.target),
            $form = $target.is('.comments-form') ? $target : $target.parents('.comments-form:first'),
            $textarea = $form.find('textarea'),
            $commentWrap,
            parentId;

        // if editing comment
        if($form.is('.comment-editing-form')) {

            instance.updateComment( instance.state.get('editingCommentId'), $textarea.val() );
            instance.state.set('editingCommentId', null);

        // if adding comment
        } else {

            // define parent id
            if(($commentWrap = $form.parents('.comment-wrap:first')).length) {
                parentId = $commentWrap.data('id');
                instance.hideReplyForm();
            } else {
                parentId = "0";
            }

            instance.addComment( $textarea.val(), parentId ); // use Meteor Method

        }

        $textarea.val(''); // clear form
        return false; // cancel submit event
    },

    'click .comment-reply'(event, instance) {
        let $target = $(event.target);
        let $commentWrap = $target.parents('.comment-wrap:first');

        // if id of comment-wrap equals to current replying comment
        if($commentWrap.data('id') == instance.state.get('commentIdWithForm')) {
            return true;
        }

        instance.state.set('commentIdWithForm', $commentWrap.data('id'));

        // replace comments form after comment
        $commentWrap.find('.comment-item:first').after( instance.getReplyForm() );
        instance.showReplyForm();
    },

    'click .comment-edit'(event, instance) {
        let $target = $(event.target);
        let $commentWrap = $target.parents('.comment-wrap:first');

        if($commentWrap.data('id') == instance.state.get('editingCommentId')) {
            return false;
        }

        instance.state.set('editingCommentId', $commentWrap.data('id'));
    }
});