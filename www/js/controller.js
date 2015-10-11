angular.module('instagram.controller', ['instagram.services', 'angularMoment'])

.controller('AppCtrl', function($scope, $state, $ionicPopup, UserService) {

    console.log(UserService.isAuthenticated);
    console.log(UserService.user);
    if (UserService.isAuthenticated) {
        $scope.user = UserService.user;
        $state.go('app.home', {}, {reload: true});
            console.log("check Auth");
    } else {
        $state.go('login', {}, {reload: true});
            console.log("check Auth2");
    }

})

.controller('RegisterCtrl', function($scope) {

})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, UserService) {
    $scope.user = {email: "", password: ""};

    $scope.login = function() {
        UserService.login($scope.user).then(function(res) {
            $state.go('app.home', {}, {reload: true});
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: err.message
            });
        });
    }
})

.controller('HomeCtrl', function($scope) {

})

.controller('SearchCtrl', function($scope) {


})

.controller('CameraCtrl', function($scope) {

})

.controller('ActivityCtrl', function($scope) {


})

.controller('AccountCtrl', function($scope) {

});