import { Template } from 'meteor/templating';

import "./auth-form.html";

Template['atSocial'].helpers({
    iconClass: function() {
        let ic = AccountsTemplates.texts.socialIcons[this._id];
        if (!ic)
            ic = "uk-icon-" + this._id;
        return ic;
    }
});
Template['override-atSocial'].replaces("atSocial");

