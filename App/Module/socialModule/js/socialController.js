/**
 * Created by MRAMALTI on 22-10-2015.
 */


angular.module('Business.Modules.Social',['Business.Core'])
    .controller('socialController', ['$scope', 'appConfig', 'relativeUrlConfig', '$sce', '$templateRequest', '$compile',  function($scope, appConfig, relativeUrlConfig, $sce, $templateRequest, $compile){
        $scope.frameurl = $sce.trustAsResourceUrl(appConfig.BASE_API_URL + relativeUrlConfig.GOOGLE_LOGIN);

        $templateRequest($scope.frameurl).then(
            function(template){
                $compile(angular.element(".external-load").html(template).contents())($scope)
            }
        );
        angular.element(".external-load").load($scope.frameurl);
        console.log($scope.frameurl);
    }]);