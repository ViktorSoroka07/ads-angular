(function() {
  angular.module('Ads').factory('randomString', [
    function() {
      return function() {
        return Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 5);
      };
    },
  ]);
})();
