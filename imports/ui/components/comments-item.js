import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';

import { Comments } from '../../api/comments/comments.js';

import './comments-form.js';
import './comments-item.html';

Template.commentsItem.onCreated(function commentsItemOnCreated() {

    this.autorun(() => {
        // TODO: validate currentData of template
        /*new SimpleSchema({
         editingCommentId: { type: String },
            comment: { type: Comments._helpers }
        }).validate(Template.currentData());*/
    });

    this.editing = () => {
        return this.data.editingCommentId === this.data.comment._id;
    };
});

Template.commentsItem.helpers({
    authorName() {
        let user = Meteor.users.findOne(this.comment.userId);
        if(user) {
            return user.profile.name;
        }
    },

    editing() {
        const instance = Template.instance();
        return instance.editing();
    },

    editable() {
        return this.comment.userId === Meteor.userId();
    },

    showFooter() {
        const instance = Template.instance();
        return Meteor.userId() && !instance.editing();
    },

    createdDate() {
        // initialized on ../pages/comment.js file
        if(window.dateTick) window.dateTick.get(); // reactive var for updating time on ui every minute
        return moment(this.comment.date).fromNow();
    },

    commentReplies() {
        return Comments.find({parentId: this.comment._id});
    },

    commentFormArgs() {
        return {
            isEditComment: this.editingCommentId === this.comment._id,
            defaultText: this.comment.text
        };
    },

    commentsItemArgs(comment) {
        return {
            comment,
            editingCommentId: this.editingCommentId
        }
    },
});