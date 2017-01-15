import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';
import { ReactiveDict } from 'meteor/reactive-dict';

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

    this.state = new ReactiveDict();
    this.state.setDefault({
        commentIdWithForm: null,
    });


    this.addComment = () => {
        const text = this.$('.comments-form textarea').val().trim();
        if (text) {
            insert.call({
                text,
                parentId: "0",
            }, (msg) => {
                console.log(msg);
            });
        }
    };

    this.getCommentForm = () => {
        return this.$commentForm ? this.$commentForm : this.$commentForm = $('.comments-form');
    }

});

Template.commentsPage.helpers({
    commentsList() {
        return Comments.find({ parentId: "0" }, {sort: {date: -1}});
    }
});

Template.commentsPage.events({
    'click'(event, instance) {
        let $target = $(event.target);
        let $commentWrap;

        if(instance.state.get('commentIdWithForm') !== null // if comment form places after comment (reply form)
            && !($commentWrap = $target.parents('.comment-wrap:first')).length // and it isn't comment-wrap container
        ) {
            // reset comments form data and return form to original location
            instance.state.set('commentIdWithForm', null);
            $('.comments-list').before( instance.getCommentForm() );
        }
    },

    'submit .comments-form, keypress .comments-form, click .comments-form-send'(event, instance) {
        // if pressed key is not enter - return
        if(event.keyCode && event.keyCode != 13) return true;

        let $target = $(event.target);

        instance.addComment(); // use Meteor Method
        ($target.is('textarea') ? $target : $('.comments-form').find('textarea'))
            .val(''); // clear form
        return false; // cancel submit event
    },

    'click .comment-reply'(event, instance) {
        let $target = $(event.target);
        let $commentWrap = $target.parents('.comment-wrap:first');

        // if id of comment-wrap equals to current replying comment
        if($commentWrap.data('id') == instance.state.get('commentIdWithForm'))
            return true;

        instance.state.set('commentIdWithForm', $commentWrap.data('id'));
        // replace comments form after comment
        $commentWrap.append( instance.getCommentForm() );
    }
});