/**
 * Created by navneet.prabhakar on 14-10-2015.
 */


'use strict';

angular
    .module('Business.Core')
    .factory('httpService', ['$http', 'appConfig', function ($http, appConfig) {

        var makeHttpRequest = function (request, successCallback, errorCallback) {
            $http(request)
                .success(successCallback)
                .error(function (data, status, header, config) {
                    if (errorCallback) {
                        errorCallback(data, status, header, config);
                    }
                })
        };

        var getWithCompleteUrl = function (requestURL, successCallback, errorCallback, params) {
            var request = {
                method: "GET",
                url: requestURL,
                withCredentials: true
            };
            if (params) {
                request.params = params;
            }
            makeHttpRequest(request, successCallback, errorCallback);
        };

        var postWithCompleteUrl = function (requestURL, postData, successCallback, errorCallback) {
            var request = {
                method: "POST",
                url: requestURL,
                withCredentials: true
            };

            if (postData) {
                request.data = postData;
            }
            makeHttpRequest(request, successCallback, errorCallback);
        };

        return {

            get: function (url, successCallback, errorCallback, params) {
                var requestURL = appConfig.BASE_API_URL + url;
                getWithCompleteUrl(requestURL, successCallback, errorCallback, params);
            },
            post: function (url, postData, successCallback, errorCallback) {

                var requestURL = appConfig.BASE_API_URL + url;
                postWithCompleteUrl(requestURL, postData, successCallback, errorCallback);
            },

            put: function (url, postData, successCallback, errorCallback) {
                var requestURL = appConfig.BASE_API_URL + url;

                var request = {
                    method: "PUT",
                    url: requestURL
                };

                request.data = postData;

                makeHttpRequest(request, successCallback, errorCallback);
            },

            patch: function (url, data, successCallback, errorCallback) {
                var requestURL = appConfig.BASE_URL_API + url;

                var request = {
                    method: "PATCH",
                    url: requestURL
                };

                request.data = data;

                makeHttpRequest(request, successCallback, errorCallback);
            },

            /**
             * @name delete
             * The method for HTTP DELETE
             * @param url - URL of server
             * @param successCallback - The callback function that will be executed for successful request
             * @param errorCallback - The callback function that will be executed for failed request
             */
            delete: function (url, successCallback, errorCallback) {
                var requestURL = appConfig.BASE_API_URL + url;

                var request = {
                    method: "DELETE",
                    url: requestURL
                };

                makeHttpRequest(request, successCallback, errorCallback);
            }
        };
    }]);