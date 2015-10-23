/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

'use strict';

angular.module('Business.Modules.Map', ['Business.Core']).controller('mapController', ['$scope', 'templateUrlConfig', '$route', 'mapService', function ($scope, templateUrlConfig, $route, mapService) {

    var defaultOptions = {
        maxZoom: 20,
        minZoom: 2
    };

    function clickEvent(marker){
        alert(marker.labelContent);
        console.log(marker.position);
    }

    var defaultMarkerOption = {
        draggable: false,
        labelAnchor: "100 0",
        labelClass: "marker-labels",
        labelContent:"My Current Location"
    };

    var filteredAddressSuccessCallback = function(response){
        console.log(response);
        $scope.markers = [];
        angular.forEach(response, function(key){
            console.log(key);
            defaultMarkerOption.labelContent = key.business.businessName+ "; Type:" + key.business.businessType+"  address:"+key.street +";"+key.city+";"+key.state+";"+key.country;
            $scope.markers.push({
                id:key.id,
                location: {
                    latitude: key.lat,
                    longitude: key.lon
                },
                options: defaultMarkerOption,
                click: clickEvent
            });
        })
    };

    var getFilteredAddress = function(lat, lng){
        var params = {
            lat: lat,
            lng: lng
        };

        mapService.getFilteredAddress(params, filteredAddressSuccessCallback, function(error){
            console.log(error);
            alert(error.error);
        })
    };


    $scope.markers = [];

    $scope.map = {};

    var onSuccess = function (position) {
        getFilteredAddress(position.coords.latitude, position.coords.longitude);

        $scope.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        $scope.map.zoom = 14;
        $scope.map.options = defaultOptions;

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

            getFilteredAddress(place.geometry.location.A, place.geometry.location.F);

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


