/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

'use strict';

angular
    .module('Business.Main')
    .config(['$routeProvider', '$httpProvider', 'templateUrlConfig', function ($routeProvider, $httpProvider, templateUrlConfig) {

        $httpProvider.defaults.withCredentials = true;

        $routeProvider.when('/', {
            templateUrl: templateUrlConfig.HOME_TEMP,
            controller: 'homeController',
            title: 'Business | Home'
        }).when('/login', {
            templateUrl: templateUrlConfig.LOGIN_TEMP,
            controller: 'loginController',
            title: 'Business | Login'
        }).when('/map/:location', {
            templateUrl: templateUrlConfig.MAP_TEMP,
            controller: 'mapController',
            title: 'Business | Map'
        }).when('/social', {
            templateUrl: templateUrlConfig.SOCIAL_LOGIN,
            controller: 'socialController',
            title: 'Business | Social - Login'
        }).otherwise('/');

    }]);