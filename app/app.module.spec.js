// Yep, it's all in one file!
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

  it('replaces element with content', function () {
    function getElementText(input) {
      var childScope = $scope.$new();
      childScope.percent = input;

      var element = $compile('<percent value="percent"></percent>')(childScope);
      childScope.$digest();

      return element.text();
    }

    expect(getElementText(0)).toBe('0%');
    expect(getElementText(0.12345)).toBe('12.345%');
    expect(getElementText(0.5)).toBe('50%');
    expect(getElementText(1)).toBe('100%');

    expect(getElementText(-1)).not.toBe('-100%');
    expect(getElementText(2)).not.toBe('200%');

    expect(getElementText('not a number')).not.toBe('');
  });

  it('replaces attribute with content', function () {
    function getElementText(input) {
      var childScope = $scope.$new();
      childScope.percent = input;

      var element = $compile('<span percent value="percent"></span>')(childScope);
      childScope.$digest();

      return element.text();
    }

    expect(getElementText(0)).toBe('0%');
    expect(getElementText(0.12345)).toBe('12.345%');
    expect(getElementText(0.5)).toBe('50%');
    expect(getElementText(1)).toBe('100%');

    expect(getElementText(-1)).not.toBe('-100%');
    expect(getElementText(2)).not.toBe('200%');

    expect(getElementText('not a number')).not.toBe('');
  });

  it('validates properly as a form element', function () {
    function getElementForm(input) {
      var childScope = $scope.$new();
      childScope.percent = input;

      var html = '<form name="form"><input type="text" ng-model="percent" percent /></form>';
      var element = $compile(html)(childScope);
      childScope.$digest();

      return childScope.form;
    }

    expect(getElementForm(0).$invalid).toBe(false);
    expect(getElementForm(0.5).$invalid).toBe(false);
    expect(getElementForm(1).$invalid).toBe(false);

    expect(getElementForm(null).$invalid).toBe(true);
    expect(getElementForm(undefined).$invalid).toBe(true);
    expect(getElementForm('').$invalid).toBe(true);
    expect(getElementForm('not a number').$invalid).toBe(true);
    expect(getElementForm(-1).$invalid).toBe(true);
    expect(getElementForm(1.5).$invalid).toBe(true);
    expect(getElementForm(2).$invalid).toBe(true);
  });

});
