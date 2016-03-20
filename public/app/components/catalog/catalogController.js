(function () {
    "use strict";

    var controllerId = "catalogController";

    angular.module("app.catalog").controller(controllerId,
        [
            "$scope",
            "catalogViewModel",
            catalogController
        ]);

    function catalogController ($scope, catalogViewModel) {

        //initialize view model
        catalogViewModel
            .init()
            .then(function catalogViewModelInitSuccess() {

                //assign vm model to scope
                $scope.model = catalogViewModel.model;
            });


        $scope.previousPage = function () {
            catalogViewModel.previousPage();
        };
        $scope.nextPage = function () {
            catalogViewModel.nextPage();
        };
        $scope.reOrder = function () {
            catalogViewModel.reOrder();
        };

        //destroy and release memory
        $scope.$on("$destroy", function () {

            catalogViewModel.dispose();
        });

    }

})();