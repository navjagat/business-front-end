/**
 * Created by navneet.prabhakar on 15-10-2015.
 */

'use strict';

angular
    .module('Business.Modules.Login', ['Business.Core'])
    .controller('loginController', ['$scope', '$rootScope', '$location', 'authService', 'httpService', 'relativeUrlConfig', 'localStorageService', 'constants', 'notificationConfig', 'notificationService', function ($scope, $rootScope, $location, authService, httpService, relativeUrlConfig, localStorageService, constants, notificationConfig, notificationService) {
        $scope.form = {};

        $scope.inputType = 'password';

        $scope.LOGIN_TEXT = "LogIn";
        $scope.USERNAME_TEXT = "UserName";
        $scope.ONLY_PASSWORD = "Password"

        $scope.submitLogin = function (form) {
            if (form.userName && form.password) {

                authService.login(form.userName, form.password).then(function () {
                var loggedIndata = localStorageService.get(constants.AUTH_DATA);

                $rootScope.userName = loggedIndata.firstName + ' ' + loggedIndata.lastName;
                $location.path('/');

                $rootScope.authenticated = true;
            })
        }
    }
}])
