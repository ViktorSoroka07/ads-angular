(function () {
    'use strict';
    /*global angular*/
    var app = angular.module('Ads', ['ngTagsInput', 'ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
            $stateProvider
                .state('home', {
                    url: "/home",
                    templateUrl: "./templates/home.html",
                    controller: 'AdsController'
                })
                .state('form-ad', {
                    url: "/form-ad",
                    templateUrl: "./templates/ad-form.html",
                    controller: 'AdsController'
                })
        })
        .controller('AdsController', ['addsModel', 'tagsModel', function (addsModel, tagsModel) {
            var self = this;
            self.newAd = {};
            self.active = 1;
            self.loadTags = tagsModel.loadTags;
            Object.defineProperty(self, 'ads', {
                get: function () {
                    return addsModel.getAds();
                }
            });
            Object.defineProperty(self, 'tags', {
                get: function () {
                    return tagsModel.getTags();
                }
            });
            if (self.ads === null) {
                addsModel.fetchAds();
            }
            self.addAdvertisement = function (ad) {
                self.newAd.createdOn = Date.now();
                self.newAd.tags = tagsModel.refactorTags(self.tags);
                addsModel.addAds(self.newAd);
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