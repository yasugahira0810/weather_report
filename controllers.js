weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function (newVal) {

    cityService.city = newVal;

  });

  $scope.submit = function () {
    $location.path('/forecast');
  };

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', 'weatherService', '$routeParams', function ($scope, $resource, cityService, weatherService, $routeParams) {

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || '2';

  $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);

  $scope.convertToCelcius = function (degK) {
    return Math.round(degK - 273.15);

  };

  $scope.convertToDate = function (dt) {

    return new Date(dt * 1000);

  };

}]);
