import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/comments.js';

// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js';

FlowRouter.route('/', {
    name: 'App.home',
    action() {
        if(Meteor.userId()) {
            FlowRouter.go('Comments.list');
        }
        BlazeLayout.render('appBody', { main: 'authPage' });
    },
});

FlowRouter.route('/comments', {
    name: 'Comments.list',
    action() {
        BlazeLayout.render('appBody', { main: 'commentsPage' });
    },
});

// the App_notFound template is used for unknown routes
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('appBody', {});
    },
};