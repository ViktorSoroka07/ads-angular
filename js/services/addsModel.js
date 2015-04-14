(function () {
    angular.module('Ads').service('addsModel', ['storageService', '$http', function (storageService, $http) {
        var self = this,
            ads = storageService.getData('ads');
        self.getAds = function () {
            return ads;
        };
        self.addAds = function (ad) {
            ads.push(ad);
            storageService.setData('ads', ads);
        };
        self.setAds = function (data) {
            ads = data;
            storageService.setData('ads', ads);
        };
        self.fetchAds = function () {
            $http.get('./js/ads.json').then(
                function (response) {
                    ads = response.data;
                    storageService.setData('ads', ads);
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }]);
}());