(function () {
    "use strict";

    var directiveId = "appCatalog";

    angular.module("app.catalog").directive(directiveId,
        [
            appCatalog
        ]);

    function appCatalog () {

        return {
            restrict : "E",
            templateUrl: "app/components/catalog/catalogView.html",
            replace: true,
            link: function (scope, elem, attrs) {

            }
        };

    }

})();