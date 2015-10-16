/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

'use strict';

angular.module('Business.Modules.Map', ['Business.Core']).controller('mapController', ['$scope', 'templateUrlConfig', '$route', function ($scope, templateUrlConfig, $route) {

    var defaultOptions = {
        maxZoom: 18,
        minZoom: 2
    };

    function clickEvent(marker){
        console.log(marker.labelContent);
        console.log(marker.position);
    }

    var defaultMarkerOption = {
        draggable: false,
        labelAnchor: "100 0",
        labelClass: "marker-labels",
        labelContent:"My Current Location"
    };

    $scope.markers = [];

    $scope.map = {};

    var onSuccess = function (position) {
        $scope.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        $scope.map.zoom = 14;
        $scope.map.options = defaultOptions;

        $scope.markers.push({
            id:0,
            location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            options: defaultMarkerOption,
            click: clickEvent
        });

        $scope.$apply();
    };

    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

    if ($route.current.params.location === "currentLocation") {
        $scope.showSearchBox = false;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }

    } else if ($route.current.params.location === "setLocation") {
        $scope.showSearchBox = true;
        $scope.map = {
            center: {
                latitude: 32.779680,
                longitude: -79.935493
            },
            zoom: 14,
            options: defaultOptions
        };
    }

    var events = {
        places_changed: function (searchBox) {
            var place = searchBox.getPlaces()[0];
            var marker = {
                id:1,
                options: defaultMarkerOption,
                click:clickEvent
            };

            marker.location = {
                latitude: place.geometry.location.A,
                longitude: place.geometry.location.F
            };

            $scope.map.center = {
                latitude: place.geometry.location.A,
                longitude: place.geometry.location.F
            };

            $scope.map.zoom = 14;
            $scope.map.options = defaultOptions;
            $scope.markers.push(marker);
            $scope.$apply();
        }
    };

    $scope.searchbox = {
        template: templateUrlConfig.SEARCH_BOX_TEMP,
        events: events
    }

}]);


