import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

// Don't let people write arbitrary data to their 'profile' field from the client
// TODO: update security access to methods
/*Meteor.users.deny({
    update() {
        return true;
    },
});*/

// Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell
// TODO: set list of methods
const AUTH_METHODS = [];

// Only allow 2 login attempts per connection per 5 seconds
/*DDPRateLimiter.addRule({
    name(name) {
        return _.contains(AUTH_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
}, 2, 5000);*/