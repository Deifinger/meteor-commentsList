import { Comments } from '../../api/comments/comments.js';

import './comments-item.html';

Template.commentsItem.onCreated(function commentsItemOnCreated() {
    this.autorun(() => {
        // TODO: validate currentData of template
        /*new SimpleSchema({
            comment: { type: Comments._helpers }
        }).validate(Template.currentData());*/
    });
});

Template.commentsItem.helpers({
    authorName() {
        return Meteor.users.findOne(this.userId).profile.name;
    }
});