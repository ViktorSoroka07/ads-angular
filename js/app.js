(function () {
    'use strict';
    /*global angular*/
    var app = angular.module('Ads', ['ngTagsInput', 'ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/ads");
            $stateProvider
                .state('ads', {
                    url: '/ads',
                    templateUrl: './templates/ads.html'
                })
                .state('editAd', {
                    url: 'ads/:item',
                    templateUrl: './templates/ad-form.html',
                    controller: 'AdsController'
                })
                .state('form-ad', {
                    url: '/form-ad',
                    templateUrl: './templates/ad-form.html'
                })
        })
        .controller('AdsController', ['addsModel', 'tagsModel', function (addsModel, tagsModel) {
            var self = this;
            self.newAd = {};
            self.active = 1;
            self.loadTags = tagsModel.loadTags;
            Object.defineProperty(self, 'adsCollection', {
                get: function () {
                    return addsModel.getAds();
                }
            });
            Object.defineProperty(self, 'adsCount', {
                get: function () {
                    return addsModel.getAdsCount();
                }
            });
            Object.defineProperty(self, 'tagsCollection', {
                get: function () {
                    return tagsModel.getTags();
                }
            });
            if (self.adsCollection === null) {
                addsModel.fetchAds();
            }
            self.editAdvertisement = function (id) {
                for (var i in self.adsCollection) {
                    if (self.adsCollection.hasOwnProperty(i)) {
                        if (self.adsCollection[i].id === id) {
                            self.newAd = angular.copy(self.adsCollection[i]);
                            tagsModel.setTags(tagsModel.refactorTagsObject(self.newAd.tags));
                        }
                    }
                }
            };
            self.addAdvertisement = function (ad) {
                var addMethod = self.newAd.createdOn ? addsModel.updateAd : addsModel.addAds;
                self.newAd.createdOn = self.newAd.createdOn || Date.now();
                self.newAd.id = self.newAd.id || self.adsCount + 1;
                self.newAd.tags = tagsModel.refactorTagsArray(self.tagsCollection);
                addMethod(self.newAd);
                self.newAd = {};
                tagsModel.removeTags();
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