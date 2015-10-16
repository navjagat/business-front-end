/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

'use strict';
angular
    .module('Business.Core', ['uiGmapgoogle-maps', 'ngStorage'])
    .config(['uiGmapGoogleMapApiProvider', '$httpProvider', function (uiGmapGoogleMapApiProvider, $httpProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyB4iRyfTDwgN8Sfrk8sfv6yzq8RTZdsZRY',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization,places'
        });

        $httpProvider.defaults.withCredentials = true;
    }]);