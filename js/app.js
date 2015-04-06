(function () {
    'use strict';
    /*global angular*/
    var app = angular.module('Ads', ['product-module', 'ngTagsInput']);
    app.controller('AdsController', ['$http', '$scope', function ($http, $scope) {
        var self = this;
        self.newAd = {};
        self.tags = [];
        self.ads = JSON.parse(localStorage.getItem('ads'));
        if (!self.ads) {
            $http.get('./js/ads.json').success(
                function (data) {
                    self.ads = data;
                    localStorage.setItem('ads', JSON.stringify(self.ads));
                }
            );
        }

        self.loadTags = function() {
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
            self.ads.push(self.newAd);
            self.newAd = {};
            self.tags = [];
            localStorage.setItem('ads', JSON.stringify(self.ads));
        };
    }]);

    app.directive('switcherView', function () {
        return {
            restrict: 'E',
            templateUrl: './js/directives/switcher-view.html',
            controller: function () {
                this.view = 'col-md-12';
                this.setView = function (str) {
                    this.view = str === 'block' ? 'col-md-12' : 'col-md-4';
                };
            },
            controllerAs: 'switcherViewCtrl'
        };
    });

    app.directive('adTags', function () {
        return {
            restrict: 'E',
            templateUrl: './js/directives/ad-tags.html'
        };
    });
})();