angular.module('instagram.services', ['ionic', 'instagram.constant'])

.factory('AuthService', function($q, $http, URL) {
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
        isAuthenticated = true;        
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
                    storeUserCredentials(res.token, res.user);
                    resolve(res.user.username);
                })
                .error(function (err) {
                    reject(err);
                });
        });        
    }

    var logout = function() {
        destroyUserCredentials();
    };

    var register = function(data) {
        return $q(function (resolve, reject) {

            $http.post(URL.base + URL.register, data)
                .success(function (res) {
                    console.log(res.message);
                    resolve('Register success');
                })
                .error(function (err) {
                    reject(err);
                });
        });
    }

    var checkAuth = function() {
        return $q(function (resolve, reject) {

            $http.get(URL.base + URL.authenticate)
                .success(function (res) {
                    this.user = res.user;
                    resolve(res);
                })
                .error(function (err) {
                    reject(err);
                });
        });
    }

    loadUserCredentials();

    return {
        login: login,
        logout: logout,
        register: register,
        checkAuth: checkAuth,
        isAuthenticated: isAuthenticated,
        user: this.user
    };
})

.factory('UserService', function($q, $http, URL) {
    var loadUser = function(user_id) {
        return $q(function (resolve, reject) {

            if (!user_id) reqURL = URL.base + URL.getProfile;
            else reqURL = URL.base + URL.getProfile + '/' + user_id;

            $http.get(reqURL)
                .success(function (res) {
                    resolve(res);
                })
                .error(function (err) {
                    reject(err);
                });
        }); 
    }

    return {
        loadUser: loadUser
    };
})

.factory('PostService', function($q, $http, URL, AuthService) {
    var loadNewfeeds = function() {
        return $q(function (resolve, reject) {

            $http.get(URL.base + URL.postNewfeeds)
                .success(function (res) {
                    resolve(res);
                })
                .error(function (err) {
                    reject(err);
                });
        }); 
    }

    var loadComments = function(getPost) {
        return $q(function (resolve, reject) {

            $http.get(URL.base + URL.postComment + '/' + getPost)
                .success(function (res) {
                    resolve(res);
                })
                .error(function (err) {
                    reject(err);
                });
        });
    }

    var loadPosts = function(user_id) {
        return $q(function (resolve, reject) {
            if (!user_id) reqURL = URL.base + URL.postRead;
            else reqURL = URL.base + URL.postUser + '/' + user_id;

            $http.get(reqURL)
                .success(function (res) {
                    resolve(res);
                })
                .error(function (err) {
                    reject(err);
                });
        });
    }

    var postPost = function(image, data) {
        var options = {
                fileKey: 'image',
                params: data,
                headers: {
                    "x-auth-token": $http.defaults.headers.common['x-auth-token']
                }
            };

        return $q(function (resolve, reject) {

            $cordovaFileTransfer.upload(encodeURI(URL.base + URL.postRead), image, options, true)
                .then(function(res) {
                    resolve(res);
                }, function(err) {
                    reject(err);
                }, function(progress) {

                });
        });
    }

    var like = function(getPost) {
        return $q(function (resolve, reject) {

            $http.post(URL.base + URL.postLike + '/' + getPost)
                .success(function (res) {
                    resolve(res);
                })
                .error(function (err) {
                    reject(err);
                });
        });  
    }

    var unlike = function(getPost) {
        return $q(function (resolve, reject) {

            $http.put(URL.base + URL.postLike + '/' + getPost)
                .success(function (res) {
                    resolve(res);
                })
                .error(function (err) {
                    reject(err);
                });
        });  
    }

    var toggleLike = function(getPost) {
        if (getPost.tickLike === false) {
            like(getPost.id).then(function() {
                console.log("liked");
                getPost.tickLike = true;
                getPost.likes.push(AuthService.user);
            });
        } else {
            unlike(getPost.id).then(function() {
                console.log("liked");
                getPost.tickLike = false;
                getPost.likes.splice(getPost.likes.indexOf(AuthService.user), 1);
            });
        }
    }

    var postComment = function(getPost, getComment) {
        var data = {text: getComment};

        return $q(function (resolve, reject) {

            $http.post(URL.base + URL.postComment + '/' + getPost.id, data)
                .success(function (res) {
                    getPost.comments.push(res.comment);
                    resolve(res.comment);
                })
                .error(function (err) {
                    reject(err);
                });
        });
    }

    return {
        newFeeds: loadNewfeeds,
        loadComments: loadComments,
        loadPosts: loadPosts,
        postPost: postPost,
        like: like,
        unlike: unlike,
        toggleLike: toggleLike,
        postComment: postComment
    };
})