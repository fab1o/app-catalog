(function () {
    "use strict";

    var serviceId = "catalogService";

    angular.module("app.catalog").service(serviceId,
        [
            "$q",
            "$log",
            "$http",
            "catalogConfig",
            "boxArtFactory",
            catalogService
        ]);

    function catalogService($q, $log, $http, catalogConfig, boxArtFactory) {

        this.cache = null; //TODO: implement cache

        /**
         * Loads catalog content
         * @param {number} page
         * @param {string} orderBy
         * @param {boolean} ascending
         * @returns {*}
         */
        this.load = function (page, orderBy, ascending) {

            page = page || 1;

            orderBy = orderBy || "title";

            if (page < 0)
                page = 0;

            var take = catalogConfig.PAGE_SIZE;

            var skip = (page - 1) * take;

            var max = take * page;

            $log.info(serviceId, "loadContent - page: " + page + " - skip: " + skip + " - max: " + max);

            var deferred = $q.defer();

            $http
                .get(catalogConfig.FEED_URL)
                .then(function getSuccess(resp) {

                    if (resp.data.Data) {

                        var boxArts = boxArtFactory.createBoxArtList(resp.data.Data);

                        //sort by given orderBy parameter
                        boxArts = boxArts.orderBy(orderBy, ascending);

                        //set pagination
                        var items = [];

                        for (var i = skip; i < max && i < boxArts.length; i++) {
                            items.push(boxArts[i]);
                        }

                        deferred.resolve({
                            pages: Math.ceil(resp.data.TotalHits / catalogConfig.PAGE_SIZE),
                            items: items
                        });

                    }else{
                        deferred.reject();
                    }

                })
                .catch(function getFail() {

                    $log.error(serviceId, "getFail");

                    deferred.reject();
                });

            return deferred.promise;
        };

        return this;
    }

    Array.prototype.orderBy = function (property, ascending) {

        var mapped = this.map(function (item, i) {
            return {index: i, value: item[property]};
        });

        if (ascending) {
            mapped.sort(function (a, b) {
                return +(a.value > b.value) || +(a.value === b.value) - 1;
            });
        }else{
            mapped.sort(function (a, b) {
                return +(a.value < b.value) || +(a.value === b.value) - 1;
            });
        }

        var self = this;
        return mapped.map(function (item) {
            return self[item.index];
        });

    };

})();