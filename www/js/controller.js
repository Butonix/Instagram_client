angular.module('instagram.controller', ['instagram.services', 'angularMoment'])

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService) {

    console.log(AuthService.isAuthenticated);
    console.log('currentUser: ' + AuthService.user);
    if (AuthService.isAuthenticated) {
        $scope.user = AuthService.user;
        $state.go('app.home', {}, {reload: true});
            console.log("check Auth");
    } else {
        $state.go('login', {}, {reload: true});
            console.log("check Auth2");
    }

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
    $scope.refresh = function() {
        PostService.newFeeds().then(function (res) {
            $scope.posts = res;

            for (var i = 0; i < $scope.posts.length; i++) {
                (function(j) {
                    UserService.loadUser($scope.posts[j].user_id).then(function (res) {
                        console.log(j);               
                        $scope.posts[j].user_username = res.username;
                        $scope.posts[j].user_avatar = res.avatar;
                        
                    }, function (err) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Can not load author\'post!',
                            template: err.message
                        });
                    });

                    // CommentService.
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

.controller('AccountCtrl', function($scope) {

});