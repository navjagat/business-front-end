/**
 * Created by MRAMALTI on 15-10-2015.
 */

'use strict';

angular
    .module('Business.Modules.Home',['Business.Core'])
    .controller('homeController',['$rootScope', '$scope', '$location', function($rootScope, $scope, $location){
        $scope.currentLoc = function(){
            $location.path('map/currentLocation');
        };

        $scope.showManageDialog = function(){
            angular.element(".manage-dialog").addClass("manage-business-show");
        };

        $scope.setLocation = function(){
            $location.path("map/setLocation");
        }
    }]);
