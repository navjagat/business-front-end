/**
 * Created by navneet.prabhakar on 14-10-2015.
 */


'use strict';

angular
    .module('Business.Core')
    .factory('authService', ['$http', 'localStorageService', 'appConfig', 'relativeUrlConfig', 'constants', 'notificationService', 'notificationConfig', '$location', '$rootScope', function ($http, localStorageService, appConfig, relativeUrlConfig, constants, notificationService, notificationConfig, $location, $rootScope) {
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: ''
        }

        var _login = function (userName, password) {
            var data = 'username=' + userName + '&password=' + password;

            $http.post(
                appConfig.BASE_API_URL + relativeUrlConfig.LOGIN_URL, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function (response, status) {
                    console.log(status)
                }).error(function(error, status){
                    console.log(status);
                    console.log(error);
                })
        }

        var _isLoggedIn = function(){
            var authData = localStorageService.get(constants.AUTH_DATA);
            if(authData){
                return true;
            }
            return false;
        }

        authServiceFactory.login = _login;
        authServiceFactory.isLoggedIn = _isLoggedIn
        authServiceFactory.authentication = _authentication;


        return authServiceFactory;
    }])