(function (base) {
    "use strict";

    var factoryId = "boxArtFactory";

    angular.module("app").factory(factoryId, boxArtFactory);

    function boxArtFactory() {

        return {
            BoxArt: BoxArt,
            createBoxArtList: createBoxArtList
        };

        function BoxArt(json) {

            json = json || {};

            json.Item = json.Item || {};

            this.title = json.Item.Title || "";
            this.runTimeSec = json.Item.RunTimeSec || 0;
            this.releaseYear = json.Item.ReleaseYear || 0;


            for (var i=0; i < json.Item.Images.length; i++) {

                var image = json.Item.Images[i];

                if (image.Type == 1) {
                    this.imageSrc = image.ImageId;
                }
            }

        }

        function createBoxArtList(json) {

            var boxArts = [];
            var boxArtsJson = json || [];

            for (var i = 0; i < boxArtsJson.length; i++) {

                var boxArt = new BoxArt(boxArtsJson[i]);
                boxArts.push(boxArt);
            }

            return boxArts;
        }

    }

})();
