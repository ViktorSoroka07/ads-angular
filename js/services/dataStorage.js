(function () {
    angular.module('Ads').service('storageService', [function () {
        var self = this;
        self.getData = function (key) {
            return angular.fromJson(localStorage.getItem(key));
        };
        self.setData = function (key, value) {
            localStorage.setItem(key, angular.toJson(value));
        }
    }]);
}());