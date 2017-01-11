import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app-body.js';

// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js';

FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'Auth_page' });
    },
});

// the App_notFound template is used for unknown routes
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', {});
    },
};