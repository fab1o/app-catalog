(function () {
    "use strict";

    var viewModelId = "catalogViewModel";

    angular.module("app.catalog").service(viewModelId,
        [
            "$q",
            "$log",
            "catalogService",
            catalogViewModel
        ]);

    function catalogViewModel($q, $log, catalogService) {

        this.model = null;

        /**
         * Initializes it
         */
        this.init = function () {

            $log.info(viewModelId, "init");

            this.model = {
                page: 1,
                pages: 0,
                orderBy: "title",
                ascending: true,
                items: null
            };

            return this.load();
        };

        /**
         * Loads content
         */
        this.load = function () {

            $log.info(viewModelId, "load");
            
            var deferred = $q.defer();

            var self = this;
            
            catalogService
                .load(this.model.page, this.model.orderBy, this.model.ascending)
                .then(function loadContentSuccess(result) {

                    self.model.pages = result.pages;
                    self.model.items = result.items;

                    deferred.resolve(self.model);

                })
                .catch(function loadContentFail() {

                    deferred.reject();
                });

            return deferred.promise;
        };

        this.nextPage = function() {

            $log.info(viewModelId, "nextPage");

            if (this.model.page < this.model.pages) {

                this.model.page++;

                return this.load();
            }

            return null;
        };

        this.previousPage = function() {

            $log.info(viewModelId, "previousPage");

            if (this.model.page > 0) {

                this.model.page--;

                return this.load();
            }

            return null;
        };

        this.reOrder = function() {

            $log.info(viewModelId, "reOrder");

            this.model.page = 1;

            return this.load();
        };

        /**
         * Disposes it
         * @returns {boolean}
         */
        this.dispose = function () {

            $log.info(viewModelId, "dispose");

            this.model = null;
            
            return true;
        };

        return this;
    }

})();
