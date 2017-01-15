import { Meteor } from 'meteor/meteor';

import { Comments } from '../comments.js';

// TODO: remove autopublish and subscribe client
/*Meteor.publish('comments.list', function commentsList() {
    return Comments.find({
        parentId: { $equal: 0 },
    }, {
        fields: Comments.publicFields,
    });
});

// TODO: make it some effectively
Meteor.publish('comments.replies', function commentsReplies(parentId) {
    return Comments.find({
        parentId
    }, {
        fields: Comments.publicFields,
    });
});*/