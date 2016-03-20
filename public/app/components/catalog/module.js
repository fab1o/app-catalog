(function () {
    "use strict";
    
    var VERSION = "1.0.0";

    angular.module("app.catalog",
        [
            "app.grid"
        ])

        .constant("version", VERSION);

})();