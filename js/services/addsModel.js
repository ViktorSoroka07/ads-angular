(function () {
    angular.module('Ads').service('addsModel', ['storageService', '$http', function (storageService, $http) {
        var self = this,
            adsCollection = storageService.getData('adsCollection');
        self.getAds = function () {
            return adsCollection;
        };
        self.getAdsCount = function () {
            return adsCollection.length || 0;
        };
        self.updateAd = function (ad, ad_index) {
            adsCollection[ad_index] = ad;
            storageService.setData('adsCollection', adsCollection);
        };
        self.removeAd = function(ad_index) {
            adsCollection.splice(ad_index, 1);
            storageService.setData('adsCollection', adsCollection);
        };
        self.addAds = function (ad) {
            adsCollection.push(ad);
            storageService.setData('adsCollection', adsCollection);
        };
        self.setAds = function (data) {
            adsCollection = data;
            storageService.setData('adsCollection', adsCollection);
        };
        self.fetchAds = function () {
            $http.get('./js/ads.json').then(
                function (response) {
                    adsCollection = response.data;
                    storageService.setData('adsCollection', adsCollection);
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }]);
}());