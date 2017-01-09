import { AccountsTemplates } from 'meteor/useraccounts:core';

/**
 * The useraccounts package must be configured for both client and server to work properly.
 * See the Guide for reference (https://github.com/meteor-useraccounts/core/blob/master/Guide.md)
 */

// TODO: init home page as auth page and set template and content region
AccountsTemplates.configure({
    //showForgotPasswordLink: true,
    //defaultTemplate: 'Auth_page',
    defaultLayout: 'App_body',
    //defaultContentRegion: 'main',
    //defaultLayoutRegions: {},
});