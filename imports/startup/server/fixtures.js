import { Meteor } from 'meteor/meteor';
import { Comments } from '../../api/comments/comments.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    let userId = '';
    const timestamp = new Date();

    if(Meteor.users.find().count() == 0) {
        const data = [
            {
                email: "ex@mp.le",
                username: 'rob',
                name: "Robert Jenkins"
            }
        ];

        data.forEach((user) => {
            userId = Meteor.users.insert({
                username: user.username,
                email: user.email,
                password: "123123123",
                profile: {
                    name: user.name
                }
            });
        });
    }

    if(Comments.find().count() == 0) {
        const data = [
            {
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.",
                replies: [
                    { text: "Laboriosam quaerat sapiente minima nam minus similique illum architecto et!" },
                    { text: "Laboriosam quaerat sapiente minima nam minus similique illum architecto et!" },
                    {
                        text: "Incidunt vitae quae facere ducimus nostrum aliquid dolorum veritatis dicta!",
                        replies: [
                            { text: "Tenetur laborum quod cum excepturi recusandae porro sint quas soluta!" }
                        ]
                    }
                ]
            },
            {
                text: "Voluptatum ducimus voluptates voluptas?"
            }
        ];

        let addComment = (comment, parentId = "0") => {

            let commentId = Comments.insert({
                text: comment.text,
                date: timestamp,
                parentId: parentId,
                userId: userId,
            });

            if(comment.replies) {
                comment.replies.forEach((comment) => { addComment(comment, commentId) })
            }
        };
        data.forEach((comment) => {addComment(comment)});
    }
});