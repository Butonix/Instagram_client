angular.module('instagram.services', [])

.factory('Posts', function() {

    var posts = [{
        id: 0,
        user: {
            id: 0,
            username: "Mary",
            profile_img: "img/ionic.png"
        },
        created_time: new Date(),
        image: "img/img.jpg",
        caption: "Description for post 1",
        likes: ["user1", "user2", "user3"],
        comments: [{
            user: {
                id: 1,
                username: "user1",
                profile_img: "img/ionic.png"
            },
            content: "Comment by user1"
        }, {
            user: {
                id: 2,
                username: "user2",
                profile_img: "img/ionic.png"
            },
            content: "Comment by user2"
        }, {
            user: {
                id: 0,
                username: "user3",
                profile_img: "img/ionic.png"
            },
            content: "Comment by user3"
        }]

    }, {
        id: 1,
        user: {
            id: 1,
            username: "Rose",
            profile_img: "img/ionic.png"
        },
        created_time: new Date(),
        image: "img/img.jpg",
        caption: "Description for post 2",
        likes: ["user1", "user2", "user3"],
        comments: [{
            user: {
                id: 1,
                username: "user1",
                profile_img: "img/ionic.png"
            },
            content: "Comment by user1"
        }, {
            user: {
                id: 2,
                username: "user2",
                profile_img: "img/ionic.png"
            },
            content: "Comment by user2"
        }, {
            user: {
                id: 0,
                username: "user3",
                profile_img: "img/ionic.png"
            },
            content: "Comment by user3"
        }]
    }];

    return {
        all: function() {
            return posts;
        },
        remove: function(post) {
            posts.splice(posts.indexOf(chat), 1);
        },
        get: function(post_id) {
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id == parseInt(post_id)) {
                    return posts[i];
                }
            }
            return null;
        }
    }
})