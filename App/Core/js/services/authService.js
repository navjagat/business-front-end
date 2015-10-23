/**
 * Created by navneet.prabhakar on 14-10-2015.
 */


'use strict';

angular
    .module('Business.Core')
    .factory('authService', ['$http', '$q', 'localStorageService', 'appConfig', 'relativeUrlConfig', 'constants', 'notificationService', 'notificationConfig', '$location', '$rootScope', function ($http, $q, localStorageService, appConfig, relativeUrlConfig, constants, notificationService, notificationConfig, $location, $rootScope) {
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: ''
        };

        var _login = function (userName, password) {
            var data = 'username=' + userName + '&password=' + password;

            var deferred = $q.defer();

            $http.post(
                appConfig.BASE_API_URL + relativeUrlConfig.LOGIN_URL, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function (response, status) {

                    _authentication.isAuth = true;
                    _authentication.userName = userName;

                    deferred.resolve({
                        response: response,
                        status: status
                    });
                }).error(function (error, status) {
                    deferred.reject({
                        error: error,
                        status: status
                    });
                });

            return deferred.promise;
        };

        var _isLoggedIn = function () {
            var authData = localStorageService.get(constants.AUTH_DATA);
            if (authData) {
                return true;
            }
            return false;
        };

        var _logout = function (path) {

            $http.get(appConfig.BASE_API_URL + relativeUrlConfig.LOGOUT_URL)
                .success(function (response, status) {
                    if (status === 200) {
                        localStorageService.remove(constants.AUTH_DATA);
                        $location.path(path);
                    }
                }).error(function (error, status) {
                    console.log(error);
                    if (status === 401) {
                        localStorageService.remove(constants.AUTH_DATA);
                        $location.path(path);
                    }
                });
        };

        var _googleLogin = function(){
          /*$http.get(appConfig.BASE_API_URL + relativeUrlConfig.GOOGLE_LOGIN)
              .then(function(response, status, headers){
                  console.log('success', response);
                  console.log(status);
                  console.log(headers);
              },
              function(error, status, headers){
                  console.log('error', error, status);
                  console.log(status, headers)
              });*/
            return appConfig.BASE_API_URL + relativeUrlConfig.GOOGLE_LOGIN;
        };

        authServiceFactory.login = _login;
        authServiceFactory.isLoggedIn = _isLoggedIn
        authServiceFactory.authentication = _authentication;
        authServiceFactory.googleLogin = _googleLogin;
        authServiceFactory.logout = _logout;


        return authServiceFactory;
    }
    ])
;