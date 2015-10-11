angular.module('instagram.constant', [])

.constant('URL', {
    base: 'http://localhost:3000',
    authenticate: '/api/user/auth',
    register: '/api/user',

    postFeeds: '/api/post/feeds',
    postRead: '/api/post',
    postLike: '/api/like/post',
    postComment: '/api/comment/post',
    postUser: '/api/post/user',
});