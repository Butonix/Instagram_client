// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic'])
var app = angular.module('instagram', ['ionic', 'instagram.controller', 'instagram.services', 'ngCordova']);

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


app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.tabs.style("standard");
    $stateProvider

        .state('register', {
            url: '/register',
            cache: false,
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl'
        })

        .state('login', {
            url: '/login',
            cache: false,
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
            cache: false,
            views: {
                'app-home': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
                }
            }
        })

        .state('app.home-user', {
            url: '/home-user/:userid',
            cache: false,
            views: {
                'app-home': {
                templateUrl: 'templates/account.html',
                controller: 'UsersCtrl'
                }
            }
        })

        // .state('app.home-user.grid', {
        //     url: '/grid',
        //     cache: false,
        //     views: {
        //         'users-grid': {
        //         templateUrl: 'templates/account-grid.html',
        //         controller: 'UsersCtrl'
        //         }
        //     }
        // })

        // .state('app.home-user.post', {
        //     url: '/post',
        //     cache: false,
        //     views: {
        //         'users-post': {
        //         templateUrl: 'templates/account-post.html',
        //         controller: 'UsersCtrl'
        //         }
        //     }
        // })

        .state('app.search', {
            url: '/search',
            cache: false,
            views: {
                'app-search': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
                }
            }
        })

        .state('app.search.people', {
            url: '/people',
            cache: false,
            views: {
                'search-people': {
                templateUrl: 'templates/search-people.html',
                controller: 'SearchCtrl'
                }
            }
        })

        .state('app.search.tags', {
            url: '/tags',
            cache: false,
            views: {
                'search-tags': {
                templateUrl: 'templates/search-tags.html',
                controller: 'SearchCtrl'
                }
            }
        })

        .state('app.search.places', {
            url: '/places',
            cache: false,
            views: {
                'search-places': {
                templateUrl: 'templates/search-places.html',
                controller: 'SearchCtrl'
                }
            }
        })

        .state('app.camera', {
            url: '/camera',
            cache: false,
            views: {
                'app-camera': {
                templateUrl: 'templates/camera.html',
                controller: 'CameraCtrl'
                }
            }
        })

        .state('app.activity', {
            url: '/activity',
            cache: false,
            views: {
                'app-activity': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
                }
            }
        })

        .state('app.activity.following', {
            url: '/following',
            cache: false,
            views: {
                'activity-following': {
                templateUrl: 'templates/activity-following.html',
                controller: 'ActivityCtrl'
                }
            }
        })

        .state('app.activity.you', {
            url: '/you',
            cache: false,
            views: {
                'activity-you': {
                templateUrl: 'templates/activity-you.html',
                controller: 'ActivityCtrl'
                }
            }
        })

        .state('app.account', {
            url: '/account',
            cache: false,
            views: {
                'app-account': {
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
                }
            }
        })

        // .state('app.account.grid', {
        //     url: '/grid',
        //     views: {
        //         'grid-img': {
        //         templateUrl: 'templates/account-grid.html',
        //         controller: 'AccountCtrl'
        //         }
        //     }
        // })

        // .state('app.account.post', {
        //     url: '/post',
        //     views: {
        //         'post-img': {
        //         templateUrl: 'templates/account-post.html',
        //         controller: 'AccountCtrl'
        //         }
        //     }
        // })

        .state('app.edit', {
            url: '/edit',
            cache: false,
            views: {
                'app-account': {
                templateUrl: 'templates/account-edit.html',
                controller: 'AccountCtrl'
                }
            }
        })

        .state('app.option', {
            url: '/option',
            cache: false,
            views: {
                'app-account': {
                templateUrl: 'templates/account-option.html',
                controller: 'AccountCtrl'
                }
            }
        })
        ;

    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise(function ($injector, $location) {
    //     var $state = $injector.get("$state");
    //     $state.go("app.home");
    // });
    $urlRouterProvider.otherwise('/login');
});