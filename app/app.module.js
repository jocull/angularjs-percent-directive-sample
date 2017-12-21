(function () {
  // Setup app module, sample controller, and directive
  angular
    .module('percentApp', [])
    .controller('PercentController', function PercentController($scope) {
      $scope.percent = 0.12345; // default
    })
    .directive('percent', function percentDirective() {
      return {
        template: '{{model * 100 | number}}%',
        scope: {
          model: '=value',
        },
      };
    });

})();
