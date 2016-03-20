(function () {
    "use strict";

    angular.module("app.asset")

        .filter("timeDescriptive", function () {
            return function (input) {

                if (input > 60) {

                    return Math.floor(input / 60) + " min";

                } else if (input > 0) {

                    return Math.floor(input) + " sec";
                }

            }
        });

})();