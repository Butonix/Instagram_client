angular.module('instagram.controller', ['instagram.services', 'angularMoment'])

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService) {
    // console.log(AuthService.isAuthenticated);
    // console.log('currentUser: ' + AuthService.user);
    // if (AuthService.isAuthenticated) {
    //     $scope.user = AuthService.user;
    //     $state.go('app.home', {}, {reload: true});
    //         console.log("check Auth");
    // } else {
    //     $state.go('login', {}, {reload: true});
    //         console.log("check Auth2");
    // }

    AuthService.checkAuth().then(function (res) {
        AuthService.user = res.user;
        $scope.currentUser = AuthService.user;
        $state.go('app.home', {}, {reload: true});
    }, function (err) {
        $state.go('login', {}, {reload: true});
    });

})

.controller('RegisterCtrl', function($scope, $state, $ionicPopup, AuthService) {
    $scope.user = {email: "", password: ""};

    $scope.register = function() {
        AuthService.register($scope.user).then(function (res) {
            $state.go('login', {}, {reload: true});
            var alertPopup = $ionicPopup.alert({
                title: 'Register successfully!',
                template: 'Welcome to Instagram service!'
            });
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not create new account!',
                template: err.message
            });
        });
    }
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
    $scope.user = {email: "", password: ""};

    $scope.login = function() {
        AuthService.login($scope.user).then(function (res) {
            $state.go('app.home', {}, {reload: true});
            var alertPopup = $ionicPopup.alert({
                title: 'Register successfully!',
                template: 'Hello, ' + res + "!"
            });
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: err.message
            });
        });
    }
})

.controller('HomeCtrl', function($scope, $state, $ionicPopup, PostService, UserService, AuthService) {
    console.log("Homectrl");
    $scope.refresh = function() {
        PostService.newFeeds().then(function (res) {
            $scope.posts = res;

            for (var i = 0; i < $scope.posts.length; i++) {
                (function(j) {
                    UserService.loadUser($scope.posts[j].user_id).then(function (res) {              
                        $scope.posts[j].user = res;
                        if ($scope.posts[j].user.userid == AuthService.user.userid) {
                            console.log('right user');
                        }       
                    }, function (err) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Can not load author\'post!',
                            template: err.message
                        });
                    });

                    for (var a = 0; a < $scope.posts[j].likes.length; a++) {
                        (function(b) {
                            UserService.loadUser($scope.posts[j].likes[b]).then(function (res) {              
                                $scope.posts[j].likes[b] = {};
                                $scope.posts[j].likes[b].username = res.username;
                                $scope.posts[j].likes[b].id = res._id;                      
                            }, function (err) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Can not load liker!',
                                    template: err.message
                                });
                            });
                        }(a));             
                    }

                    PostService.loadComments($scope.posts[j]._id).then(function (res) {              
                        $scope.posts[j].comments = res;                        
                    }, function (err) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Can not load comment!',
                            template: err.message
                        });
                    });
                }(i));                
            }

        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not load newfeeds!',
                template: err.message
            });
        })
        
    }

    $scope.refresh();
})

.controller('SearchCtrl', function($scope) {


})

.controller('CameraCtrl', function($scope) {

})

.controller('ActivityCtrl', function($scope) {


})

.controller('AccountCtrl', function($scope, $state, $stateParams, $ionicPopup, PostService, AuthService, UserService) {
    console.log('go Account');

    $scope.account = function() {
        $scope.user = AuthService.user;
        console.log($scope.user);
    }

    $scope.getPost = function() {
                                    console.log('getpost');
        PostService.loadPosts().then(function (res) {
            $scope.posts = res;
            console.log($scope.posts);
        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not load posts!',
                template: err.message
            });
        });
    }

    $scope.refresh = function() {
        $scope.account();
        $scope.getPost();  
    }
})

.controller('UsersCtrl', function($scope, $state, $stateParams, $ionicPopup, PostService, AuthService, UserService) {
    console.log('go Users');
    $scope.account = function() {
        UserService.loadUser($stateParams.userid).then(function (res) {
            $scope.user = res;
        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not load user!',
                template: err.message
            });
        })
    }

    $scope.getPost = function() {
        PostService.loadPosts($stateParams.userid).then(function (res) {
            $scope.posts = res;
            console.log($scope.posts);
        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not load posts!',
                template: err.message
            });
        });
    }

    $scope.refresh = function() {
        $scope.account();
        $scope.getPost();  
    }
});