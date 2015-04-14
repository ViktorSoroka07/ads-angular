(function () {
    'use strict';
    /*global angular*/
    var app = angular.module('Ads', ['ngTagsInput'])
        .controller('AdsController', ['addsModel', 'storageService', '$http', function (addsModel, storageService, $http) {
            var self = this;
            self.newAd = {};
            self.tags = [];
            addsModel.setAds(storageService.getData('ads'));
            self.ads = function() {
                return addsModel.getAds();
            };
            if (!self.ads()) {
                $http.get('./js/ads.json').success(
                    function (data) {
                        addsModel.setAds(data);
                        storageService.setData('ads', self.ads());
                    }
                );
            }

            self.loadTags = function () {
                return $http.get('./js/tags.json');
            };

            self.refactorTags = function (arr) {
                return arr.map(function (item) {
                    return item.text;
                });
            };

            self.addAdvertisement = function (ad) {
                self.newAd.createdOn = Date.now();
                self.newAd.tags = self.refactorTags(self.tags);
                addsModel.addAds(self.newAd);
                self.newAd = {};
                self.tags = [];
                storageService.setData('ads', self.ads());
            };
        }])

        .directive('switcherView', ['storageService', function (storageService) {
            return {
                restrict: 'E',
                templateUrl: './js/directives/switcher-view.html',
                controller: function () {
                    this.view = storageService.getData('ads-view') || 12;
                    this.setView = function (str) {
                        this.view = str === 'block' ? 12 : 4;
                        storageService.setData('ads-view', this.view);
                    };
                },
                controllerAs: 'switcherViewCtrl'
            };
        }])

        .directive('adTags', function () {
            return {
                restrict: 'E',
                templateUrl: './js/directives/ad-tags.html'
            };
        })

        .directive('singleAd', function () {
            return {
                restrict: 'E',
                templateUrl: './js/directives/single-ad.html'
            };
        });
})();