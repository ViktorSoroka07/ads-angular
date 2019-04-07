(function() {
  angular.module('Ads').service('addsModel', [
    'storageService',
    '$http',
    function(storageService, $http) {
      let adsCollection = storageService.getData('adsCollection');

      this.getAds = function() {
        return adsCollection;
      };

      this.getAdsCount = function() {
        return adsCollection.length || 0;
      };

      this.updateAd = function(ad, ad_index) {
        adsCollection[ad_index] = ad;
        storageService.setData('adsCollection', adsCollection);
      };

      this.removeAd = function(id) {
        adsCollection.some(function(item, index) {
          if (item._id === id) {
            adsCollection.splice(index, 1);
            storageService.setData('adsCollection', adsCollection);
            return true;
          }
        });
      };

      this.addAds = function(ad) {
        adsCollection.push(ad);
        storageService.setData('adsCollection', adsCollection);
      };

      this.setAds = function(data) {
        adsCollection = data;
        storageService.setData('adsCollection', adsCollection);
      };

      this.fetchAds = function() {
        $http.get('./js/ads.json').then(
          function(response) {
            adsCollection = response.data;
            storageService.setData('adsCollection', adsCollection);
          },
          function(error) {
            console.log(error.message);
          }
        );
      };
    },
  ]);
})();
