describe('PercentController', function () {

  beforeEach(module('percentApp'));

  it ('test running should be all cool', function() {
    expect(true).toBe(true);
  });

  it('should create an empty percent controller', inject(function ($controller) {
    var scope = {};
    var ctrl = $controller('PercentController', { $scope: scope });

    expect(scope.percent).toBeGreaterThanOrEqual(0);
    expect(scope.percent).toBeLessThanOrEqual(1);
  }));

});
