(function() {
  angular.module('Ads').service('tagsModel', [
    '$http',
    function($http) {
      let tagsCollection = [];

      this.getTags = function() {
        return tagsCollection;
      };
      this.setTags = function(tags) {
        tagsCollection = tags;
      };
      this.removeTags = function() {
        tagsCollection.length = 0;
      };
      this.loadTags = function() {
        return $http.get('./js/tags.json');
      };
      this.refactorTagsArray = function(arr) {
        return arr.map(({ text }) => text);
      };
      this.refactorTagsObject = function(arr) {
        return arr.map(text => ({ text }));
      };
    },
  ]);
})();
