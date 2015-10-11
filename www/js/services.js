angular.module('instagram.services', ['ionic', 'instagram.constant'])

.factory('UserService', function($q, $http, URL) {
    var LOCAL_TOKEN_KEY = 'localToken';
    var LOCAL_USER_KEY  = 'Instagram User';
    var isAuthenticated = false;

    var loadUserCredentials = function() {
        var getToken = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        var getUser  = window.localStorage.getItem(LOCAL_USER_KEY);
        if (!!getToken) {
            useCredentials(getToken, getUser);
        }
    }

    var storeUserCredentials = function(getToken, getUser) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, getToken);
        window.localStorage.setItem(LOCAL_USER_KEY, getUser.username);
        useCredentials(getToken);
    }

    var useCredentials = function(getToken, getUser) {
        try {
            this.user = JSON.parse(getUser);
        } catch(err) {
            this.user = null;
        }
        
        $http.defaults.headers.common['x-access-token'] = getToken;
    }

    var destroyUserCredentials = function() {
        isAuthenticated = false;
        this.user = undefined;
        $http.defaults.headers.common['x-access-token'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        window.localStorage.removeItem(LOCAL_USER_KEY);
    }

    var login = function(data) {
        return $q(function (resolve, reject) {

            $http.post(URL.base + URL.authenticate, data)
                .success(function (res) {
                    isAuthenticated = true;
                    storeUserCredentials(res.token, res.user);
                    console.log(res.message);
                    resolve('Login success');
                })
                .error(function (err) {
                    reject(err);
                });
        });        
    }

    var logout = function() {
        destroyUserCredentials();
    };

    loadUserCredentials();

    return {
        login: login,
        logout: logout,
        isAuthenticated: isAuthenticated,
        user: this.user
    };
})