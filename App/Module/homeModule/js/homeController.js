/**
 * Created by MRAMALTI on 15-10-2015.
 */

'use strict';

angular
    .module('Business.Modules.Home', ['Business.Core'])
    .controller('homeController', ['$rootScope', '$scope', '$location', 'homeService', function ($rootScope, $scope, $location, homeService) {
        $scope.business = {};

        $scope.address = {};

        //angular.element(".address-multi").multiselect();

        $scope.defaultTypes = ["FOOD", "APPARELL", "ELECTRONICS", "GROCERIES"];

        $scope.setLoc = function () {
            $location.path("map/setLocation");
        };

        $scope.currentLoc = function () {
            $location.path('map/currentLocation');
        };

        $scope.showManageDialog = function () {
            angular.element(".manage-dialog").addClass("manage-business-show");
        };

        $scope.createBusiness = function (business) {
            console.log($scope.business);
            homeService.createBusiness($scope.business, function(response){
                console.log(response.status);
                alert('Business Created');
            },function(error){
                console.log(error);
                alert('Business failed');
            })

        }
    }]);

