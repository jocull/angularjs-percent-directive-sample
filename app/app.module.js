(function () {
  // Setup app module, sample controller, and directive
  angular
    .module('percentApp', [])
    .controller('PercentController', function PercentController($scope) {
      if (typeof $scope.percent === 'undefined') {
        $scope.percent = null; // default
      }
    })
    .directive('percent', function percentDirective($filter) {
      function link(scope, element, attrs) {
        var numberFilter = $filter('number');

        function update(value) {
          var n = parseFloat(value);
          if (!isNaN(n)
            && n >= 0
            && n <= 1) {

            element.text(numberFilter(n * 100) + '%');
            scope.valid = true;
          } else {
            element.text('Invalid input!');
            scope.valid = false;
          }
        }

        scope.$watch(attrs.value, function (newValue) {
          update(newValue);
        });
      }

      return {
        link,
      };
    });

})();
