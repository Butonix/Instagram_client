angular.module('instagram.controller', ['instagram.services', 'angularMoment'])

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService) {

    AuthService.checkAuth().then(function (res) {
        AuthService.user = res.user;

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
            AuthService.user = res.user;

            $state.go('app.home', {}, {reload: true});
            var alertPopup = $ionicPopup.alert({
                title: 'Register successfully!',
                template: 'Hello, ' + res.user.username + "!"
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
    $scope.currentUser = AuthService.user;
    $scope.comment = {text: ""};
    console.log($scope.currentUser);

    $scope.refresh = function() {
        PostService.newFeeds().then(function (res) {
            $scope.posts = res;

            for (var i = 0; i < $scope.posts.length; i++) {
                (function(j) {
                    $scope.posts[j].tickLike = false;

                    for (var a = 0; a < $scope.posts[j].likes.length; a++) {
                        (function(b) {

                            if ($scope.posts[j].likes[b] === AuthService.user.userid) {
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
        if ($scope.comment.text.trim() === "") return false;
        PostService.postComment(getPost, $scope.comment.text);
        $scope.comment.text = null;
    }

    $scope.toggleLike = function(getPost) {
        PostService.toggleLike(getPost);
    }

    $scope.deletePost = function(getPost) {
        PostService.deletePost(getPost).then(function (res) {
            $state.go($state.current.name, {}, {reload: true});
            AuthService.user.countPost--;

        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not delete Post!',
                template: err.message
            });
        });
    }

})

.controller('SearchCtrl', function($scope, $state, $ionicPopup, PostService, UserService, AuthService) {
    $scope.currentUser = AuthService.user;
    $scope.searchText = "";
    $scope.results = [];
    $scope.message = "";

    $scope.search = function() {
        $scope.message = "";
        var key = $scope.searchText.trim();

        if (key === "") {
            $scope.searchText = "";
            return false;
        }

        UserService.searchUser(key).then(function (res) {

            if (res.status === 205) {
                $scope.message = res.message;
                return false;
            } 

            $scope.results = res;

            for (var i = 0; i < $scope.results.length; i++) {
                (function(j) {
                    $scope.results[j].tickFollow = false;

                    for (var a = 0; a < AuthService.user.followings.length; a++) {
                        (function(b) {
                            if (AuthService.user.followings[b] === $scope.results[j].userid) {
                                $scope.results[j].tickFollow = true;                                
                            }
                        }(a));             
                    }
                }(i));                
            }
        }), function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not search!',
                template: err.message
            });
        };
    }

    $scope.toggleFollow = function(getUser) {
        UserService.toggleFollow(getUser);
    }

})

.controller('CameraCtrl', function($scope, $state, $ionicPlatform, $ionicPopup, $cordovaCamera, $cordovaImagePicker, PostService) {
    $scope.image = "";
    $scope.data = {};

    $scope.isPick = function() {
        return $scope.image !== "";
    };

    $scope.pick = function() {
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
                    title: 'Failed to get image from gallery',
                    template: 'Failed on picking an image to post.'
                });
            });
    };

    $scope.camera = function() {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        $cordovaCamera.getPicture(options).then(function (path) {
            $scope.image = path;
        }, function (err) {
            $ionicPopup.alert({
                title: 'Capture failure',
                template: 'Cannot upload picture!'
            });
        });
    };

    $scope.post = function() {

        PostService.postPost($scope.image, $scope.data)
            .then(function (res) {
                $ionicPopup.alert({
                    title: 'Image uploaded!',
                    template: 'Suceessfully!'
                });
                AuthService.user.countPost++;
                $state.go('app.home', {}, {reload: true});
            }, function (err) {
                $ionicPopup.alert({
                    title: 'Upload picture failed!',
                    template: 'Please check your camera!'
                });
            });
    };
})

.controller('EditCtrl', function($scope, $state, $stateParams, $ionicPopup, PostService, UserService, AuthService) {
    $scope.user = AuthService.user;
    $scope.user.oldPassword = "";
    $scope.user.newPassword = "";
    $scope.user.repeatPassword = "";

    $scope.save = function() {
        var editUser = {};

        if ($scope.user.username !== "") {
            editUser.username = $scope.user.username;
        }

        if ($scope.user.newPassword !== "") {
            if ($scope.user.newPassword === $scope.user.repeatPassword) {
                editUser.newPassword = $scope.user.newPassword;
            } else {
                $ionicPopup.alert({
                    title: 'Change password failure!',
                    template: 'Repeat Password again!'
                });
                return false;
            }
        }

        UserService.editUser(editUser).then(function (res) {
            AuthService.user = res.user;
            $scope.user.oldPassword = "";
            $scope.user.newPassword = "";
            $scope.user.repeatPassword = "";

            $ionicPopup.alert({
                title: 'Edit Profile successfully!',
                template: res.message
            });

        }, function (err) {
            $ionicPopup.alert({
                title: 'Edit Profile failure!',
                template: err.message
            });
        });
    }

})

.controller('AccountCtrl', function($scope, $state, $stateParams, $ionicPopup, PostService, UserService, AuthService) {
    $scope.comment = {text: ""};
    $scope.currentUser = AuthService.user;

    $scope.account = function() {
        $scope.user = AuthService.user;
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

                            if ($scope.posts[j].likes[b] === AuthService.user.userid) {
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
        $scope.comment.text = null;
    }

    $scope.toggleLike = function(getPost) {
        PostService.toggleLike(getPost);
    }

    $scope.deletePost = function(getPost) {
        PostService.deletePost(getPost).then(function (res) {
            $state.go($state.current.name, {}, {reload: true});
            AuthService.user.countPost--;
            
        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not delete Post!',
                template: err.message
            });
        });
    }

    $scope.logout = function() {
        AuthService.logout();
        AuthService.user = undefined;
        $state.go('login', {}, {reload: true});
    }

    $scope.refresh = function() {
        $scope.account();
        $scope.getPost();

        $scope.prefix = 'account-';
    }
})

.controller('UsersCtrl', function($scope, $state, $stateParams, $ionicPopup, PostService, UserService, AuthService) {
    $scope.comment = {text: ""};
    $scope.currentUser = AuthService.user;

    $scope.account = function() {
        UserService.loadUser($stateParams.userid).then(function (res) {
            $scope.user = res;
            $scope.user.tickFollow = false;

                for (var a = 0; a < AuthService.user.followings.length; a++) {
                    (function(b) {

                        if (AuthService.user.followings[b] === $scope.user.userid) {
                            $scope.user.tickFollow = true;                                
                        }
                    }(a));             
                }
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

                            if ($scope.posts[j].likes[b] === AuthService.user.userid) {
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
        $scope.comment.text = null;
    }

    $scope.toggleLike = function(getPost) {
        PostService.toggleLike(getPost);
    }

    $scope.toggleFollow = function(getUser) {
        UserService.toggleFollow(getUser);
    } 

    $scope.refresh = function() {
        $scope.account();
        $scope.getPost();

        if ($state.current.name === 'app.home-user') {
            $scope.prefix = 'home-user-';
        }

        if ($state.current.name === 'app.account-user') {
            $scope.prefix = 'account-user-';
        }

        if ($state.current.name === 'app.search-user') {
            $scope.prefix = 'search-user-';
        }
    }
})

.controller('FollowCtrl', function($scope, $state, $stateParams, $ionicPopup, PostService, UserService, AuthService) {
    $scope.currentUser = AuthService.user;
    $scope.user = {};

    $scope.loadFollowers = function() {
        UserService.loadFollowers($scope.user.userid).then(function (res) {
            $scope.follows = res;

            for (var i = 0; i < $scope.follows.length; i++) {
                (function(j) {
                    $scope.follows[j].tickFollow = false;

                    for (var a = 0; a < AuthService.user.followings.length; a++) {
                        (function(b) {

                            if (AuthService.user.followings[b] === $scope.follows[j].userid) {
                                $scope.follows[j].tickFollow = true;                                
                            }
                        }(a));             
                    }
                }(i));                
            }
        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not load Followers!',
                template: err.message
            });
        });
    }

    $scope.loadFollowings = function() {

        UserService.loadFollowings($scope.user.userid).then(function (res) {
            $scope.follows = res;

            for (var i = 0; i < $scope.follows.length; i++) {
                (function(j) {
                    $scope.follows[j].tickFollow = false;

                    for (var a = 0; a < AuthService.user.followings.length; a++) {
                        (function(b) {
                            if (AuthService.user.followings[b] === $scope.follows[j].userid) {
                                $scope.follows[j].tickFollow = true;                                
                            }
                        }(a));             
                    }
                }(i));                
            }

        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Can not load Followings!',
                template: err.message
            });
        });
    }
    
    $scope.checkState = function() {
        if ($state.current.data.header === "followers") {
            $scope.title = "Followers";
            $scope.loadFollowers();
        }

        if ($state.current.data.header === "followings") {
            $scope.title = "Followings";
            $scope.loadFollowings();
        }
    }

    $scope.setup = function() {
        if (!!$stateParams.userid) {
            UserService.loadUser($stateParams.userid).then(function (res) {
                $scope.user = res;
                $scope.checkState();

            }, function (err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Can not load user!',
                    template: err.message
                });
            });
        } else {
            $scope.user = AuthService.user;
            $scope.checkState();
        }
    }

    $scope.toggleFollow = function(getUser) {
        UserService.toggleFollow(getUser);
    }   

    $scope.refresh = function() {
        $scope.setup();

        if ($state.current.name === 'app.home-user-followers'
        ||  $state.current.name === 'app.home-user-followings'){
            $scope.prefix = 'home-';
        }

        if ($state.current.name === 'app.account-user-followers'
        ||  $state.current.name === 'app.account-user-followings'
        ||  $state.current.name === 'app.account-followers'
        ||  $state.current.name === 'app.account-followings'){
            $scope.prefix = 'account-';
        }

        if ($state.current.name === 'app.search-user-followers'
        ||  $state.current.name === 'app.search-user-followings'){
            $scope.prefix = 'search-';
        }
    }
});