(function () {
    'use strict';
    /*global angular*/
    var app = angular.module('product-module', []);

    //app.directive('productTitle', function () {
    //   return {
    //       restrict: 'E',
    //       templateUrl: './js/directives/switcher-view.html',
    //       templateAs: 'product-title'
    //   };
    //});

    app.directive('productReviews', function () {
        return {
            restrict: 'E',
            templateUrl: './js/directives/product-reviews.html'
            //controller: function () {
            //    this.review = {};
            //    this.addReview = function () {
            //        this.review.createdOn = Date.now();
            //        product.reviews.push(this.review);
            //        this.review = {};
            //    };
            //},
            //controllerAs: 'reviewCtrl'
        };
    });
}());