(function () {
    'use strict';
    /*global angular*/
    var app = angular.module('Ads', ['product-module']);
    app.controller('AdsController', ['$http', function ($http) {
        var self = this;
        self.newAd = {};
        self.ads = JSON.parse(localStorage.getItem('ads'));
        if (!self.ads) {
            $http.get('./js/ads.json').success(
                function (data) {
                    self.ads = data;
                    localStorage.setItem('ads', JSON.stringify(self.ads));
                }
            );
        }
        self.addAdvertisement = function (ad) {
            self.newAd.createdOn = Date.now();
            self.ads.push(self.newAd);
            self.newAd = {};
            localStorage.setItem('ads', JSON.stringify(self.ads));
        };
    }]);

    app.directive('switcherView', function () {
        return {
            restrict: 'E',
            templateUrl: './js/directives/switcher-view.html'
        };
    });
})();