// module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// config
weatherApp.config(function ($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.htm',
    controller: 'homeController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.htm',
    controller: 'forecastController'
  })
})

// service
weatherApp.service('cityService', function () {

  this.city = 'Osaka';

});

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function (newVal) {

    cityService.city = newVal;

  });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {

  $scope.city = cityService.city;

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
    callback: 'JSON_CALLBACK'
  }, {
    get: {
      method: 'JSONP'
    }
  });

  $scope.weatherResult = $scope.weatherAPI.get({
    q: $scope.city,
    cnt: 2,
    appid: apikey
  });

  console.log($scope.weatherResult);

}]);
