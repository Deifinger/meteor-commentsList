import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { ReactiveVar } from 'meteor/reactive-var'

import { Comments } from '../../api/comments/comments.js';

import './comments-item.html';

//let moment = Moment.moment;

Template.commentsItem.onCreated(function commentsItemOnCreated() {

    // Create reactive variable for updating date at comments
    /*Meteor.defer(function () {
        this.dateTick = new ReactiveVar(false);
        this.dateTimerId = Meteor.setInterval(() => {
            this.dateTick.set(!this.dateTick.get());
        }, 10000);
    });*/


    this.autorun(() => {
        // TODO: validate currentData of template
        /*new SimpleSchema({
            comment: { type: Comments._helpers }
        }).validate(Template.currentData());*/
    });
});

/*Template.commentsItem.onDestroyed(function () {
    Meteor.clearInterval(this.dateTimerId);
});*/

Template.commentsItem.helpers({
    authorName() {
        let user = Meteor.users.findOne(this.userId);
        if(user) {
            return user.profile.name;
        }
    },

    createdDate() {
        // initialized on ../pages/comment.js file
        if(window.dateTick) window.dateTick.get(); // reactive var for updating time on ui every minute
        return moment(this.date).fromNow();
    },

    commentReplies() {
        return Comments.find({parentId: this._id});
    }
});