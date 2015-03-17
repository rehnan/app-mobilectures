angular.module('App', [])
.config(function ($compileProvider){
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.config(function ($routeProvider) {

    $routeProvider
    .when('/', {
        controller: TestCtrl,
        templateUrl: 'partials/index.html'
    })
    .when('/view', {
        controller: ViewCtrl,
        templateUrl: 'partials/home.html'
    });
});