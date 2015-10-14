/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

'use strict';

angular.module('Business.Modules.Map', ['Business.Core']).controller('mapController', ['$scope','templateUrlConfig', function($scope, templateUrlConfig){
    $scope.map = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 10
    };
    var onSuccess = function(position) {
        $scope.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        $scope.$apply();
    }
    function onError(error) {
        console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    var events = {
        places_changed: function (searchBox) {
            console.log(searchBox);
        }
    };

    $scope.searchbox = {
        template: templateUrlConfig.SEARCH_BOX_TEMP,
        events: events
    }
}]);