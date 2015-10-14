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
    $scope.comment = {text: ""};

    console.log("Homectrl");
    $scope.refresh = function() {
        PostService.newFeeds().then(function (res) {
            $scope.posts = res;

            for (var i = 0; i < $scope.posts.length; i++) {
                (function(j) {
                    $scope.posts[j].tickLike = false;

                    for (var a = 0; a < $scope.posts[j].likes.length; a++) {
                        (function(b) {

                            if ($scope.posts[j].likes[b] === $scope.currentUser.userid) {
                                $scope.posts[j].tickLike = true;                                
                            }

                            UserService.loadUser($scope.posts[j].likes[b]).then(function (res) {              
                                $scope.posts[j].likes[b] = {};
                                $scope.posts[j].likes[b].username = res.username;
                                $scope.posts[j].likes[b].userid = res._id;
                            }, function (err) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Can not load liker!',
                                    template: err.message
                                });
                            });
                        }(a));             
                    }

                    PostService.loadComments($scope.posts[j].id).then(function (res) {
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

    $scope.postComment = function(getPost) {
        PostService.postComment(getPost, $scope.comment.text);
    }

    $scope.toggleLike = function(getPost) {
        PostService.toggleLike(getPost);
    }

    $scope.refresh();
})

.controller('SearchCtrl', function($scope) {


})

.controller('CameraCtrl', function($state, $scope, $ionicPlatform, $ionicPopup, $cordovaCamera, $cordovaImagePicker, PostService) {
    $scope.image = "";
    $scope.data = {};

    $scope.isPick = function() {
        return $scope.image !== "";
    };

    $scope.picker = function() {
        var options = {
            maximumImagesCount: 1,
            width: 800,
            height: 0,
            quality: 100
        };

        $cordovaImagePicker.getPictures(options)
            .then(function(results) {
                $scope.image = results[0];
            }, function(err) {
                $ionicPopup.alert({
                    title: 'Image picking failure',
                    template: 'Failed on picking an image to post.'
                });
            });
    };

    $scope.camera = function() {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        $cordovaCamera.getPicture(options).then(function (imageURI) {
            $scope.image = imageURI;
        }, function (err) {
            $ionicPopup.alert({
                title: 'Capture failure',
                template: 'Failed on capture an image to post.'
            });
        });
    };

    $scope.post = function() {
        $rootScope.show('Please wait...');

        PostService.postPost($scope.img, $scope.data)
            .then(function (res) {
                $rootScope.hide();
                $state.go('tab.home', {}, {reload: true});
            }, function (err) {
                $rootScope.hide();
                $ionicPopup.alert({
                    title: 'Post failure',
                    template: 'There were some problems with posting'
                });
            });
    };
})

.controller('ActivityCtrl', function($scope) {


})

.controller('AccountCtrl', function($scope, $state, $stateParams, $ionicPopup, PostService, UserService) {
    $scope.comment = {text: ""};

    $scope.account = function() {
        $scope.user = $scope.currentUser;
    }

    $scope.getPost = function() {
        PostService.loadPosts().then(function (res) {
            $scope.posts = res;

            for (var i = 0; i < $scope.posts.length; i++) {
                (function(j) {
                    $scope.posts[j].tickLike = false;

                    for (var a = 0; a < $scope.posts[j].likes.length; a++) {
                        (function(b) {
                            $scope.posts[j]._id = $scope.posts[j].id;

                            if ($scope.posts[j].likes[b] === $scope.currentUser.userid) {
                                $scope.posts[j].tickLike = true;                                
                            }

                            UserService.loadUser($scope.posts[j].likes[b]).then(function (res) {              
                                $scope.posts[j].likes[b] = {};
                                $scope.posts[j].likes[b].username = res.username;
                                $scope.posts[j].likes[b].userid = res._id;
                            }, function (err) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Can not load liker!',
                                    template: err.message
                                });
                            });
                            console.log($scope.posts[j].tickLike);
                        }(a));             
                    }

                    PostService.loadComments($scope.posts[j].id).then(function (res) {           
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
                title: 'Can not load posts!',
                template: err.message
            });
        });
    }

    $scope.postComment = function(getPost) {
        PostService.postComment(getPost, $scope.comment.text);
    }

    $scope.toggleLike = function(getPost) {
        console.log(getPost);
        PostService.toggleLike(getPost);
    }

    $scope.refresh = function() {
        $scope.account();
        $scope.getPost();  
    }
})

.controller('UsersCtrl', function($scope, $state, $stateParams, $ionicPopup, PostService, UserService) {
    $scope.comment = {text: ""};

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

            for (var i = 0; i < $scope.posts.length; i++) {
                (function(j) {
                    $scope.posts[j].tickLike = false;
                    
                    for (var a = 0; a < $scope.posts[j].likes.length; a++) {
                        (function(b) {
                            $scope.posts[j].tickLike = false;
                            $scope.posts[j]._id = $scope.posts[j].id;

                            if ($scope.posts[j].likes[b] === $scope.currentUser.userid) {
                                $scope.posts[j].tickLike = true;                                
                            }

                            UserService.loadUser($scope.posts[j].likes[b]).then(function (res) {              
                                $scope.posts[j].likes[b] = {};
                                $scope.posts[j].likes[b].username = res.username;
                                $scope.posts[j].likes[b].userid = res._id;
                            }, function (err) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Can not load liker!',
                                    template: err.message
                                });
                            });
                        }(a));             
                    }

                    PostService.loadComments($scope.posts[j].id).then(function (res) {            
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
                title: 'Can not load posts!',
                template: err.message
            });
        });
    }

    $scope.postComment = function(getPost) {
        PostService.postComment(getPost, $scope.comment.text);
    }

    $scope.toggleLike = function(getPost) {
        PostService.toggleLike(getPost);
    }

    $scope.refresh = function() {
        $scope.account();
        $scope.getPost();  
    }
});