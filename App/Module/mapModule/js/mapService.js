/**
 * Created by MRAMALTI on 16-10-2015.
 */

'use strict';

angular.module('Business.Modules.Map').factory('mapService', ['httpService', 'relativeUrlConfig', function(httpService, relativeUrlConfig){
    return{
        getFilteredAddress: function(params, successCallBacl, errorCallBack){
            httpService.get(relativeUrlConfig.ADDRESS_API, successCallBacl, errorCallBack, params);
        }
    }
}])