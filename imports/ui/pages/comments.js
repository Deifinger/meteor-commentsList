import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';

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

});

Template.commentsPage.helpers({
    commentsList() {
        return Comments.find({ parentId: "0" }, {sort: {date: -1}});
    }
});

Template.commentsPage.events({
    'submit .comments-form'(event, instance) {
        instance.addComment(); // use Meteor Method
        $(this).find('textarea').val(''); // clear form
        return false; // cancel submit event
    }
});