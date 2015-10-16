/**
 * Created by MRAMALTI on 15-10-2015.
 */

'use strict';

angular
    .module('Business.Modules.Home', ['Business.Core'])
    .controller('homeController', ['$rootScope', '$scope', '$location', 'homeService', function ($rootScope, $scope, $location, homeService) {
        $scope.business = {
            businessName: "",
            businessType: "",
            addresses: []
        }

        $scope.defaultTypes = ["FOOD", "APPARELL", "ELECTRONICS", "GROCERIES"];

        function getAllAddress() {
            homeService.getAddress(function (response) {
                $scope.addresses = response;
                console.log(response)
            }, function (error) {
                console.log(error);
            });

        }

        getAllAddress();

        $scope.setLoc = function () {
            $location.path("map/setLocation");
        }

        $scope.currentLoc = function () {
            $location.path('map/currentLocation');
        };

        $scope.showManageDialog = function () {
            angular.element(".manage-dialog").addClass("manage-business-show");
        };

        $scope.createBusiness = function (business) {
            console.log($scope.business, business);
            homeService.createBusiness($scope.business, function(response){
                console.log(response.status);
                alert('Business Created');
            },function(error){
                console.log(error);
                alert('Business failed');
            })

        }
    }]);

