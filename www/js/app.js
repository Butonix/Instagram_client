// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic'])
var app = angular.module('instagram', ['ionic', 'instagram.controller', 'instagram.services']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});


app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })

        .state('app', {
            url: '/app',
            absract: true,
            templateUrl: 'templates/app.html',
        })

        .state('app.home', {
            url: '/home',
            views: {
                'app-home': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
                }
            }
        })

        .state('app.search', {
            url: '/search',
            views: {
                'app-search': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
                }
            }
        })

        .state('app.search.people', {
            url: '/people',
            views: {
                'search-people': {
                templateUrl: 'templates/search-people.html',
                controller: 'SearchCtrl'
                }
            }
        })

        .state('app.search.tags', {
            url: '/tags',
            views: {
                'search-tags': {
                templateUrl: 'templates/search-tags.html',
                controller: 'SearchCtrl'
                }
            }
        })

        .state('app.search.places', {
            url: '/places',
            views: {
                'search-places': {
                templateUrl: 'templates/search-places.html',
                controller: 'SearchCtrl'
                }
            }
        })

        .state('app.camera', {
            url: '/camera',
            views: {
                'app-camera': {
                templateUrl: 'templates/activity.html',
                controller: 'CameraCtrl'
                }
            }
        })

        .state('app.activity', {
            url: '/activity',
            views: {
                'app-activity': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
                }
            }
        })

        .state('app.activity.following', {
            url: '/following',
            views: {
                'activity-following': {
                templateUrl: 'templates/activity-following.html',
                controller: 'ActivityCtrl'
                }
            }
        })

        .state('app.activity.you', {
            url: '/you',
            views: {
                'activity-you': {
                templateUrl: 'templates/activity-you.html',
                controller: 'ActivityCtrl'
                }
            }
        })

        .state('app.account', {
            url: '/account',
            views: {
                'app-account': {
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
                }
            }
        })

        .state('app.account.grid', {
            url: '/grid',
            views: {
                'grid-img': {
                templateUrl: 'templates/account-grid.html',
                controller: 'AccountCtrl'
                }
            }
        })

        .state('app.account.post', {
            url: '/post',
            views: {
                'post-img': {
                templateUrl: 'templates/account-post.html',
                controller: 'AccountCtrl'
                }
            }
        })

        .state('app.edit', {
            url: '/edit',
            views: {
                'app-account': {
                templateUrl: 'templates/account-edit.html',
                controller: 'AccountCtrl'
                }
            }
        })

        .state('app.option', {
            url: '/option',
            views: {
                'app-account': {
                templateUrl: 'templates/account-option.html',
                controller: 'AccountCtrl'
                }
            }
        })

        .state('camera', {
            url: '/camera',
            templateUrl: 'templates/camera.html',
        })
        ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("app.home");
    });
});