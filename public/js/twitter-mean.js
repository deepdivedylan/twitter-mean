var app = angular.module("TwitterMean", ["ngMessages", "ngRoute", "ngSanitize", "ui.bootstrap"]);

app.config(function($locationProvider, $routeProvider) {
	$routeProvider
		// home page
		.when("/", {
			templateUrl: "/views/home.html",
			controller: "MainController"
		})

		// profile page that will use the ProfileController
		.when("/profile/", {
			templateUrl: "/views/profile.html",
			controller: "ProfileController"
		});

	$locationProvider.html5Mode(true);
});