(function () {
    angular.module('Ads').service('tagsModel', ['$http', function ($http) {
        var self = this,
            tagsCollection = [];
        self.getTags = function () {
            return tagsCollection;
        };
        self.setTags = function (tags) {
            tagsCollection = tags;
        };
        self.removeTags = function () {
            tagsCollection.length = 0;
        };
        self.loadTags = function () {
            return $http.get('./js/tags.json');
        };
        self.refactorTagsArray = function (arr) {
            return arr.map(function (item) {
                return item.text;
            });
        };
        self.refactorTagsObject = function (arr) {
            return arr.map(function (item) {
                return {text: item};
            });
        };
    }]);
}());