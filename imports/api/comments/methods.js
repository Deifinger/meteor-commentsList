import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Comments } from './comments.js';

export const insert = new ValidatedMethod({
    name: 'comments.insert',
    validate: new SimpleSchema({
        text: Comments.simpleSchema().schema('text'),
        parentId: Comments.simpleSchema().schema('parentId')
    }).validator(),
    run({ text, parentId }) {
        return Comments.insert({
            userId: this.userId,
            text,
            parentId,
            date: new Date()
        }, null);
    },
});

export const updateText = new ValidatedMethod({
    name: 'comments.updateText',
    validate: new SimpleSchema({
        commentId: Comments.simpleSchema().schema('_id'),
        text: Comments.simpleSchema().schema('text')
    }).validator(),
    run({ commentId, text }) {
        const comment = Comments.findOne(commentId);

        if (!comment.editableBy(this.userId)) {
            throw new Meteor.Error('comments.updateText.accessDenied',
                'You don\'t have permission to edit this list.');
        }

        return Comments.update(commentId, {
            $set: {
                text,
                updateDate: new Date()
            }
        }, null);
    }
});

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
    insert,
    updateText,
], 'name');

if (Meteor.isServer) {
    // Only allow 5 list operations per connection per second
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(LISTS_METHODS, name);
        },

        // Rate limit per connection ID
        connectionId() { return true; },
    }, 5, 1000);
}
