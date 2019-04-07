(function() {
  'use strict';
  angular.module('Ads', ['ngTagsInput', 'ui.router']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/ads');
    $stateProvider
      .state('ads', {
        url: '/ads',
        templateUrl: './templates/ads.html',
      })
      .state('editAd', {
        url: '/ads/:item',
        templateUrl: './templates/ad-form.html',
        controller: 'AdsController',
      })
      .state('form-ad', {
        url: '/form-ad',
        templateUrl: './templates/ad-form.html',
      });
  });
})();
