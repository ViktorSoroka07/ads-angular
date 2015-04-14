(function () {
    angular.module('Ads').service('tagsModel', ['$http' ,function ($http) {
        var self = this,
            tags = [];
        self.getTags = function () {
            return tags;
        };
        self.removeTags = function () {
            tags.length = 0;
        };
        self.loadTags = function () {
            return $http.get('./js/tags.json');
        };
        self.refactorTags = function (arr) {
            return arr.map(function (item) {
                return item.text;
            });
        };
    }]);
}());