/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

'use strict';
angular
    .module('Business.Core', ['uiGmapgoogle-maps', 'ngStorage'])
    .factory('httpInterceptor', ['$q', '$location', function ($q, $location) {
        var deferred = $q.defer();
        return {
            'responseError': function (response) {
                console.log(response);
                if (typeof response.data === 'string') {
                    console.log("Caught redirect");
                    console.log(response.data, response.status);
                    //$window.location.href = "/login.html";
                    deferred.reject(response);
                } else {
                    return response;
                }
                return deferred.promise;
            }
        }
    }])
    .config(['uiGmapGoogleMapApiProvider', '$httpProvider', function (uiGmapGoogleMapApiProvider, $httpProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyB4iRyfTDwgN8Sfrk8sfv6yzq8RTZdsZRY',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization,places'
        });

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.defaults.withCredentials = true;
        //$httpProvider.interceptors.push('httpInterceptor');
    }]);