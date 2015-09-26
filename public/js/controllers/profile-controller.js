app.controller("ProfileController", ["$scope", "ProfileService", function($scope, ProfileService) {
	$scope.tagline = "This is the profile controller";
	$scope.profiles = [];

	$scope.getProfiles = function() {
		ProfileService.all()
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.profiles = result.data.data;
				}
			});
	};

	$scope.getProfiles();
}]);