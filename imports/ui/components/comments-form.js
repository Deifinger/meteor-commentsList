import { Template } from 'meteor/templating';

import './comments-form.html';
import '../stylesheets/comments.scss';

Template.commentsForm.onCreated(function commentsFormOnCreated() {

    this.autorun(() => {
        new SimpleSchema({
            isEditComment: { type: Boolean },
            defaultText: { type: String }
        }).validate(Template.currentData());
    });
});

Template.commentsForm.helpers({
    editingCommentClass() {
        return this.isEditComment ? 'comment-editing-form' : '';
    }
});