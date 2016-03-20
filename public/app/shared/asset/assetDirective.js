(function () {
    "use strict";

    var directiveId = "appAsset";

    angular.module("app.asset").directive(directiveId,
        [
            asset
        ]);

    function asset() {
        return {
            restrict: "E",
            scope: {
                content: "="
            },
            templateUrl: "app/shared/asset/assetView.html",
            replace: true,
            link: function (scope, elem, attrs) {

            }
        }
    }
    
})();