/**
 *
 * This is script file to load the Header element on main page
 *
 * @author navneet.prabhakar
 * @version 1.0
 * @since 15 October 2015
 *
 */
// <business-header>
// <business-nodes>
// <business-node name="Mode"/>
// <business-node name="My Field"/>
// <business-node name="Help"/>
// <business-node name="account"/>
// </business-nodes>
// <business-view left-justified/>
// </business-header>

// 1 domain object: nodes
'use strict';

angular.module('Business.Modules.Header',
    ['Business.Core']).controller('headerController', ['$scope', 'constants', 'authService', '$rootScope', 'localStorageService', 'httpService', 'notificationConfig', 'notificationService', '$route', function ($scope, constants, authService, $rootScope, localStorageService, httpService, notificationConfig, notificationService, $route) {

        var loggedIndata = localStorageService.get(constants.AUTH_DATA);

        if (loggedIndata) {
            if(loggedIndata.displayName){
                $rootScope.userName = loggedIndata.displayName;
            }else{
                $rootScope.userName = loggedIndata.firstName + " " + loggedIndata.lastName;
            }


            if (loggedIndata.imageUrl) {
                if (loggedIndata.imageUrl.startsWith('https'))
                    $rootScope.avatar = loggedIndata.imageUrl;
                else{
                    $rootScope.avatar = 'data:image/png;base64,' + loggedIndata.avatar;
                }

            }else{
                if (loggedIndata.avatar.startsWith('https'))
                    $rootScope.avatar = loggedIndata.avatar;
                else{
                    $rootScope.avatar = 'data:image/png;base64,' + loggedIndata.avatar;
                }
            }

        }


        /**
         * @desc dropdown menu options for account tab
         * @type {*[]}
         */
        $scope.accountOpt = [
            {
                iconin: 'Main/img/profile_on.png',
                iconover: 'Main/img/profile_over.png'
            },
            {
                iconin: 'Main/img/logout_on.png',
                iconover: 'Main/img/logout_over.png'
            }
        ];

        /*initialization of account dropdown menu*/
        $scope.accountOpt[0].name = 'Profile';
        $scope.accountOpt[1].name = 'Logout';


        $scope.toggleIcon = function (e, node) {
            console.log(angular.element(e.target).parent().attr("class"));
        };

        $scope.iconActive = function (e, node) {
            angular.element(e.target).children('img').attr('src', node.iconover);
        };

        $scope.iconInactive = function (e, node) {
            angular.element(e.target).children('img').attr('src', node.iconin);
        };


        /**
         * @name logout
         * @desc Calls the logOut method of authService
         * @returns NA
         */

        $scope.logout = function (value) {
            if (value === 'Logout' || value === 'logout') {
                authService.logout('/login');
            }
        };

    }]).directive('businessHeader', ['appConfig', function (appConfig) {
        return {
            restrict: "E",
            controller: function ($scope) {
                // nodes
                //$scope.logo = appConfig.LOGO_IMAGE;

                this.setNodes = function (nodes) {
                    $scope.nodes = nodes;
                };
            },
            link: function (scope) {
                scope.$broadcast('ready-to-go', scope.nodes);
            }
        }
    }]).directive('businessNodes', function () {
        return {
            restrict: "E",
            require: ['^businessHeader', 'businessNodes'],
            controller: function () {
                var nds = [];

                this.addNodes = function (node) {
                    nds.push(node);
                };
                this.getNodes = function () {
                    return nds;
                }
            },
            link: function (scope, lElement, attrs, controllers) {
                var headerController = controllers[0];
                var nodesController = controllers[1];
                headerController.setNodes(nodesController.getNodes());
            }
        }
    }).directive('businessNode', ["$rootScope", function ($rootScope) {
        return {
            restrict: "E",
            require: "^businessNodes",
            scope: {
                subdata: "&"
            },
            link: function (scope, lElement, attrs, nodesController) {
                var node = {
                    title: attrs.name,
                    submenu: scope.subdata(),
                    user: attrs.isUser
                };


                if (node.submenu)
                    node.hasSubMenu = true;

                if (node.user === "true") {
                    node.iconin = attrs.iconIn;
                    $rootScope.$watch('userName', function (newValue, oldValue) {
                        console.log("userName", newValue, oldValue);
                        if (newValue !== oldValue && newValue.indexOf('undefined')==-1) {
                            node.title = newValue;
                        } else {
                            node.title = oldValue;
                        }
                    })
                }

                else {
                    node.iconin = attrs.iconIn;
                    node.iconover = attrs.iconOver;
                }


                nodesController.addNodes(node);
            }
        }
    }]).directive('businessView', ['templateUrlConfig', function (templateUrlConfig) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: templateUrlConfig.HEADER_TEMPLATE,
            controller: function ($scope) {
                $scope.$on('ready-to-go', function (event, nodes) {
                    $scope.tabNodes = nodes;
                    console.log('ready', nodes);
                });
            }
        };
    }]).directive('leftJustified', function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                console.log('in left justified', element.children().attr('class'));
            }
        }
    });