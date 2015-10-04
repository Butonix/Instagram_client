angular.module('instagram.controller', ['instagram.services', 'angularMoment'])

.controller('HomeCtrl', function($scope, Posts, $http) {
    $scope.posts = Posts.all();
    $scope.remove = function(post) {
        Posts.remove(post);
    }

    var newUser = {
        id: "1",
        email: "abc@d.com",
        username: "iOS 7, upgradable to iOS 7.1",
        password: "abcdef"
    };

    var loginUser = {
        email: "abc@d.com",
        password: "abcdef"
    };

    // register
    // $http({
    //     method: 'POST',
    //     url: 'http://localhost:3000/api/user/register', 
    //     data: newUser,
    //     headers: {'Content-Type': 'application/json'}
    // })
    // .success(function(data) {
    //     console.log("post new user success");
    //     console.log(data);
    // })
    // .error(function(msg) {
    //     console.log("can not post new user");
    //     console.log(msg.error);
    //     console.log(msg.message);
    // });

    // log in
    $http({
        method: 'POST',
        url: 'http://localhost:3000/api/user/login', 
        data: loginUser,
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        console.log("post login user success");
        console.log(data);
    })
    .error(function(msg) {
        console.log("can not post login user");
        console.log(msg.error);
    });

    // $http({
    //     method: 'POST',
    //     url: 'http://localhost:3000/product', 
    //     data: testProduct,
    //     headers: {'Content-Type': 'application/json'}
    // })
    // .success(function(data) {
    //     console.log("post success");
    //     console.log(data);
    // })
    // .error(function() {
    //     console.log("can not send request");
    // });

    // $http({
    //     method: 'GET',
    //     url: 'http://localhost:3000/products', 
    //     headers: {'Content-Type': 'application/json'}
    // })
    // .success(function(data) {
    //     console.log("get success");
    //     console.log(data);
    // })
    // .error(function() {
    //     console.log("can not fetch data");
    // });

})

.controller('SearchCtrl', function($scope) {


})

.controller('CameraCtrl', function($scope) {

})

.controller('ActivityCtrl', function($scope) {


})

.controller('AccountCtrl', function($scope, $ionicNavBarDelegate) {

});