describe('PercentController', function () {

  beforeEach(module('percentApp'));

  it('should create an empty percent controller', inject(function ($controller, $rootScope) {
    var childScope = $rootScope.$new();
    var ctrl = $controller('PercentController', { $scope: childScope });

    expect(childScope.percent).toBeNull();
  }));

});

describe('PercentDirective', function () {

  beforeEach(module('percentApp'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around
    // the parameter names when matching.
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
  }));

  function testElement(input, output) {
    var childScope = $scope.$new();
    childScope.percent = input;

    var element = $compile('<percent value="percent">')(childScope);
    childScope.$digest();

    return element.text();
  }

  it('replaces element with content', function () {
    expect(testElement(0)).toBe('0%');
    expect(testElement(0.12345)).toBe('12.345%');
    expect(testElement(0.5)).toBe('50%');
    expect(testElement(1)).toBe('100%');

    expect(testElement(-1)).not.toBe('-100%');
    expect(testElement(2)).not.toBe('200%');

    expect(testElement('not a number')).not.toBe('');
  });

});
