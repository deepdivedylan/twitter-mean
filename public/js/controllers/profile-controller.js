app.controller("ProfileController", ["$scope", "ProfileService", function($scope, ProfileService) {
	$scope.alerts = [];
	$scope.editedProfile = null;
	$scope.newProfile = null;
	$scope.isEditing = false;
	$scope.tagline = "This is the profile controller";
	$scope.profiles = [];

	$scope.addAlert = function(result) {
		var type = "danger";
		if(result.data.status === 200) {
			type = "success";
		}
		$scope.alerts.push({"type": type, "msg": result.data.message});
	};

	$scope.getProfiles = function() {
		ProfileService.all()
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.profiles = result.data.data;
				}
			});
	};

	$scope.createProfile = function(profile, validated) {
		if(validated === true) {
			ProfileService.create(profile)
				.then(function(result) {
					$scope.addAlert(result);
					$scope.getProfiles();
				});
		}
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.getProfiles();
}]);