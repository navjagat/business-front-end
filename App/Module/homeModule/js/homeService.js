/**
 * Created by navneet.prabhakar on 16-10-2015.
 */

'use strict';

angular.module('Business.Modules.Home').factory("homeService", ['httpService', 'relativeUrlConfig', function(httpService, relativeUrlConfig){
    return{
        getAddress: function(successCalback, errorCallback){
            httpService.get(relativeUrlConfig.ADDRESS_API, successCalback, errorCallback);
        },

        createBusiness: function(data, successCallback, errorCallBack){
            httpService.post(relativeUrlConfig.BUSINESS_API, data, successCallback, errorCallBack);
        }
    }
}])