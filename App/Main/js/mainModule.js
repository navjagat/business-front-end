/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

'use strict';

angular
    .module('Business.Main', ['ngRoute', 'Business.Core', 'Business.Modules.Map', 'Business.Modules.Header', 'Business.Modules.Login'])
    .run(['$route', '$rootScope', 'authService', 'httpService', '$location', 'localStorageService', 'constants', 'relativeUrlConfig', function ($route, $rootScope, authService, httpService, $location, localStorageService, constants, relativeUrlConfig) {
        $rootScope.isLoggedIn = false;

        //console.log($rootScope);

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            if(current && current.$$route){
                if(authService.isLoggedIn()){
                    $rootScope.isLoggedIn = true;
                    if(current.$$route.originalPath === "/login"){
                        $location.path('/');
                    }

                    if(previous && previous.$$route){
                        localStorageService.set(constants.PREVOIUSPATH, previous.$$route.originalPath);
                    }

                    var loggedInData = localStorageService.get(constants.AUTH_DATA)
                }else{
                    $rootScope.isLoggedIn = false;
                    if(current.$$route.originalPath !== '/login'){
                        $location.path('/login');
                    }
                }
            }
        });

    }]);