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
            controller: 'AppCtrl'
        })

        .state('app.home', {
            url: '/home',
            cache: false,
            reload: true,
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

        .state('app.home-user-followers', {
            url: '/home-user-followers/:userid',
            cache: false,
            views: {
                'app-home': {
                templateUrl: 'templates/follow.html',
                controller: 'FollowCtrl'
                }
            },
            data: {
                header: 'followers'
            }
        })

        .state('app.home-user-followings', {
            url: '/home-user-followings/:userid',
            cache: false,
            views: {
                'app-home': {
                templateUrl: 'templates/follow.html',
                controller: 'FollowCtrl'
                }
            },
            data: {
                header: 'followings'
            }
        })

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

        .state('app.search-user', {
            url: '/search-user/:userid',
            cache: false,
            views: {
                'app-search': {
                templateUrl: 'templates/account.html',
                controller: 'UsersCtrl'
                }
            }
        })

        .state('app.search-user-followers', {
            url: '/search-user-followers/:userid',
            cache: false,
            views: {
                'app-search': {
                templateUrl: 'templates/follow.html',
                controller: 'FollowCtrl'
                }
            },
            data: {
                header: 'followers'
            }
        })

        .state('app.search-user-followings', {
            url: '/search-user-followings/:userid',
            cache: false,
            views: {
                'app-search': {
                templateUrl: 'templates/follow.html',
                controller: 'FollowCtrl'
                }
            },
            data: {
                header: 'followings'
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

        // .state('app.activity', {
        //     url: '/activity',
        //     cache: false,
        //     views: {
        //         'app-activity': {
        //         templateUrl: 'templates/activity.html',
        //         controller: 'ActivityCtrl'
        //         }
        //     }
        // })

        // .state('app.activity.following', {
        //     url: '/following',
        //     cache: false,
        //     views: {
        //         'activity-following': {
        //         templateUrl: 'templates/activity-following.html',
        //         controller: 'ActivityCtrl'
        //         }
        //     },
        // })

        // .state('app.activity.you', {
        //     url: '/you',
        //     cache: false,
        //     views: {
        //         'activity-you': {
        //         templateUrl: 'templates/activity-you.html',
        //         controller: 'ActivityCtrl'
        //         }
        //     }
        // })

        .state('app.account', {
            url: '/account',
            cache: false,
            reload: true,
            views: {
                'app-account': {
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
                }
            }
        })

        .state('app.account-followers', {
            url: '/account-followers',
            cache: false,
            views: {
                'app-account': {
                templateUrl: 'templates/follow.html',
                controller: 'FollowCtrl'
                }
            },
            data: {
                header: 'followers'
            }
        })

        .state('app.account-followings', {
            url: '/account-followings',
            cache: false,
            views: {
                'app-account': {
                templateUrl: 'templates/follow.html',
                controller: 'FollowCtrl'
                }
            },
            data: {
                header: 'followings'
            }
        })

        .state('app.account-user', {
            url: '/account-user/:userid',
            cache: false,
            views: {
                'app-account': {
                templateUrl: 'templates/account.html',
                controller: 'UsersCtrl'
                }
            }
        })

        .state('app.account-user-followers', {
            url: '/account-user-followers/:userid',
            cache: false,
            views: {
                'app-account': {
                templateUrl: 'templates/follow.html',
                controller: 'FollowCtrl'
                }
            },
            data: {
                header: 'followers'
            }
        })

        .state('app.account-user-followings', {
            url: '/account-user-followings/:userid',
            cache: false,
            views: {
                'app-account': {
                templateUrl: 'templates/follow.html',
                controller: 'FollowCtrl'
                }
            },
            data: {
                header: 'followings'
            }
        })

        .state('app.edit', {
            url: '/edit',
            cache: false,
            reload: true,
            views: {
                'app-account': {
                templateUrl: 'templates/account-edit.html',
                controller: 'EditCtrl'
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