import { AccountsTemplates } from 'meteor/useraccounts:core';

/**
 * The useraccounts package must be configured for both client and server to work properly.
 * See the Guide for reference (https://github.com/meteor-useraccounts/core/blob/master/Guide.md)
 */

AccountsTemplates.configure({
    confirmPassword: false,
    defaultLayout: 'App_body',

    forbidClientAccountCreation: true,

    texts: {
        title: {
            signIn: ""
        }
    }
});

AccountsTemplates.configureRoute('signIn', {
    path: '/'
});