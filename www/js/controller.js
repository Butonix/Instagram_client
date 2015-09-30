angular.module('instagram.controller', ['instagram.services', 'angularMoment'])

.controller('HomeCtrl', function($scope, Posts) {
	$scope.posts = Posts.all();
	$scope.remove = function(post) {
		Posts.remove(post);
	}


})

.controller('SearchCtrl', function($scope) {


})

.controller('CameraCtrl', function($scope) {

})

.controller('ActivityCtrl', function($scope) {


})

.controller('AccountCtrl', function($scope, $ionicNavBarDelegate) {

});