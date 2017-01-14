import { Template } from 'meteor/templating';

import '../components/auth-form.js';

// import styles and html
import './accounts-templates.scss';
import './accounts-templates.html';

Template.authPage.onRendered(() => {
    let $page = $('.auth.page');
    if(!$page.hasClass('rendered')) {
        $page.addClass('rendered');
    }
});
