/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

'use strict';

angular
    .module('Business.Main', ['ngRoute', 'ngCookies', 'Business.Core', 'Business.Modules.Map', 'Business.Modules.Header', 'Business.Modules.Login', 'Business.Modules.Home', 'Business.Modules.Social'])
    .run(['$route', '$rootScope', 'authService', 'httpService', '$location', 'localStorageService', 'constants', 'relativeUrlConfig', '$cookies', '$http', function ($route, $rootScope, authService, httpService, $location, localStorageService, constants, relativeUrlConfig, $cookies, $http) {
        $rootScope.isLoggedIn = false;

        console.log('Cookies please', $cookies.get('JSESSIONID'));
        /*$http.defaults.headers.post['X-CSRF-TOKEN'] = $cookies.csrftoken;*/


        //console.log($rootScope);

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            if (current && current.$$route) {
                if (authService.isLoggedIn()) {
                    $rootScope.isLoggedIn = true;
                    httpService.get(relativeUrlConfig.AUTH_TEST_DATA, function (response) {
                        console.log(response);
                    }, function (error) {
                        $rootScope.isLoggedIn = false;
                        $location.path('/login');
                    });
                    if (current.$$route.originalPath === "/login") {
                        $location.path('/');
                    }

                    if (previous && previous.$$route) {
                        localStorageService.set(constants.PREVOIUSPATH, previous.$$route.originalPath);
                    }

                    var loggedInData = localStorageService.get(constants.AUTH_DATA);

                    if (loggedInData.displayName) {
                        $rootScope.userName = loggedInData.displayName;
                    } else {
                        $rootScope.userName = loggedInData.firstName + " " + loggedInData.lastName;
                    }

                    if (loggedIndata.imageUrl) {
                        if (loggedIndata.imageUrl.startsWith('https'))
                            $rootScope.avatar = loggedIndata.imageUrl;
                        else {
                            $rootScope.avatar = 'data:image/png;base64,' + loggedIndata.avatar;
                        }

                    } else {
                        if (loggedIndata.imageUrl.startsWith('https'))
                            $rootScope.avatar = loggedIndata.imageUrl;
                        else {
                            $rootScope.avatar = 'data:image/png;base64,' + loggedIndata.avatar;
                        }
                    }
                } else {
                    $rootScope.isLoggedIn = false;
                    httpService.get(relativeUrlConfig.AUTH_TEST_DATA, function (response, status) {
                        $rootScope.isLoggedIn = true;
                        console.log(response);
                        console.log(status);
                        localStorageService.set(constants.AUTH_DATA, response);

                        if (response.displayName) {
                            $rootScope.userName = response.displayName;
                        } else {
                            $rootScope.userName = response.firstName + " " + response.lastName;
                        }
                        if (response.imageUrl) {
                            if (response.imageUrl.startsWith('https'))
                                $rootScope.avatar = response.imageUrl;
                            else {
                                $rootScope.avatar = 'data:image/png;base64,' + response.avatar;
                            }

                        } else {
                            if (loggedIndata.avatar.startsWith('https'))
                                $rootScope.avatar = loggedIndata.imageUrl;
                            else {
                                $rootScope.avatar = 'data:image/png;base64,' + loggedIndata.avatar;
                            }
                        }
                        $location.path("/");

                    }, function (error) {
                        $rootScope.isLoggedIn = false;
                        $location.path('/login');
                        console.log(error);
                    });
                    if (!$rootScope.isLoggedIn && current.$$route.originalPath !== '/login' && current.$$route.originalPath !== '/social') {
                        $location.path('/login');
                    }
                }
            }
        });

    }]);