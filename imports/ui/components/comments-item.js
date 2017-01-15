import Moment from 'meteor/momentjs:moment';

import './comments-item.html';

let moment = Moment.moment;

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
        let user = Meteor.users.findOne(this.userId);
        if(user) {
            return user.profile.name;
        }
    },
    createdDate() {
        return moment(this.date).fromNow();
    }
});