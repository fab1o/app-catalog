(function () {
    "use strict";

    var directiveId = "appGrid";

    angular.module("app.grid").directive(directiveId,
        [
            grid
        ]);

    function grid() {
        return {
            restrict: "E",
            scope: {
                content: "="
            },
            templateUrl: "app/shared/grid/gridView.html",
            replace: true,
            link: function (scope, elem, attrs) {

            }
        }
    }

})();