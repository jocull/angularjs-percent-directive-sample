module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '**/*.spec.js',
      '!(bower_components)/**/*!(.module|.spec).js',
      '*!(.module|.spec).js',
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
    ]

  });
};
