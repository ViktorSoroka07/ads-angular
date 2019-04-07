(function() {
  angular.module('Ads').service('storageService', [
    function() {
      this.getData = function(key) {
        return angular.fromJson(localStorage.getItem(key));
      };
      this.setData = function(key, value) {
        localStorage.setItem(key, angular.toJson(value));
      };
    },
  ]);
})();
