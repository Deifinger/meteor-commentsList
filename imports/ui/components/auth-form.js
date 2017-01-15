import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import "../stylesheets/auth-form.scss";
import "./auth-form.html";

Template.authForm.onCreated(function authFormOnCreated() {

    // Hack for getting helper of current template
    if(!Template.authForm.__helpers[" isHome"]()) {
        // Hide the title of form
        Template['atForm'].helpers({
            showTitle() {
                return false;
            }
        });
    }

});

Template.authForm.helpers({
   isHome() {
       return FlowRouter.getRouteName() == 'App.home';
   }
});

// override helper of atSocial template
Template['atSocial'].helpers({
    iconClass: function() {
        let ic = AccountsTemplates.texts.socialIcons[this._id];
        if (!ic)
            ic = "uk-icon-" + this._id;
        return ic;
    },
    nameFromUpper: function () {
        return s(this._id).capitalize().value();
    }
});

// replace some templates on own
Template['override-atSocial'].replaces("atSocial");
Template['override-atForm'].replaces("atForm");



