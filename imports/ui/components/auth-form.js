import { Template } from 'meteor/templating';


import "./auth-form.scss";
import "./auth-form.html";

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

