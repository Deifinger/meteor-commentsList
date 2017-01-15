import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Comments = new Mongo.Collection('comments');

// Deny all client-side updates since we will be using methods to manage this collection
Comments.deny({
    remove() { return true; },
});

// Describe object schema
Comments.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    text: { type: String },
    date: { type: Date },
    updateDate: { type: Date, optional: true },
    parentId: {
        type: String,
        // TODO: implement two regEx expressions
        //regEx: ['/^0$/', SimpleSchema.RegEx.Id],
        defaultValue: "0",
        optional: true
    },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
});
Comments.attachSchema(Comments.schema);

// Init public fields
Comments.publicFields = {
    _id: 1,
    text: 1,
    date: 1,
    updateDate: 1,
    userId: 1,
};

Comments.helpers({
    // A comment is the reply if have parentId
    isTheReply() {
        return !!this.parentId;
    },
    editableBy(userId) {
        if (!this.userId) {
            return true;
        }

        return this.userId === userId;
    },
});
