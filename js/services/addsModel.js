(function () {
    angular.module('Ads').service('addsModel', [function () {
        var self = this,
            ads = [];
        self.getAds = function () {
            return ads;
        };
        self.addAds = function (ad) {
            ads.push(ad);
        };
        self.setAds = function (data) {
            ads = data;
        };
    }]);
}());