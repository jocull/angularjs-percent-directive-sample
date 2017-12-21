angular
  .module('percentApp', [])
  // Setup a basic controller to handle form binding
  .controller('PercentController', function PercentController($scope) {
    if (typeof $scope.percent === 'undefined') {
      $scope.percent = null; // default
    }

    $scope.submitForm = function (isValid) {
      return $isValid;
    }
  })
  // Setup the `percent` directive that will do most of the heavy lifting
  .directive('percent', function percentDirective($filter) {
    var numberFilter = $filter('number');
    
    function link(scope, element, attrs, ctrl) {
      function tryParse(value) {
        var n = parseFloat(value);
        if (!isNaN(n)
          && n >= 0
          && n <= 1) {

          return numberFilter(n * 100) + '%';
        }
        return null;
      }

      function update(value) {
        var n = tryParse(value);
        if (n !== null) {
          element.text(n);
        } else {
          element.text('Invalid input! Percent values must be between 0 and 1.');
        }
      }

      scope.$watch(attrs.value, function (newValue) {
        update(newValue);
      });

      // The model is optional, so we can use this for display or input validation
      if (ctrl && ctrl.$validators) {
        ctrl.$validators.percent = function (modelValue, viewValue) {
          var n = tryParse(viewValue);
          return n !== null;
        }
      }
    }

    return {
      require: '?ngModel',
      link,
    };
  });