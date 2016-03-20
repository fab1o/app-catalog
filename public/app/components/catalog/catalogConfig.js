(function () {
    "use strict";

    angular.module("app.catalog")

        .constant("catalogConfig", {

            PAGE_SIZE: 20,

            FEED_URL: "app/json/feed.json"

        });

})();