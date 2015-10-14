angular.module('instagram.constant', [])

.constant('URL', {
    base: 'http://localhost:3000',

    authenticate: '/api/user/auth',
    register: '/api/user',
    getProfile: '/api/user',
    searchUser: '/api/search/user',

    follow: '/api/follow/user',
    getFollowers: '/api/followers',
    getFollowings: '/api/followings',

    postNewfeeds: '/api/post/newfeeds',
    postRead: '/api/post',
    postLike: '/api/like/post',
    postComment: '/api/comment/post',
    postUser: '/api/post/user',
});