(function () {
    angular.module('Ads').service('storageService', [function () {
        var self = this;
        self.getData = function (key) {
            return JSON.parse(localStorage.getItem(key));
        };
        self.setData = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }]);
}());