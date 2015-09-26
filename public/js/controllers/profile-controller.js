app.controller("ProfileController", ["$modal", "$scope", "ProfileService", function($modal, $scope, ProfileService) {
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

	$scope.deleteProfile = function(profileId) {
		var message = "Do you really want to delete this profile?";

		var modalHtml = '<div class="modal-body">' + message + '</div><div class="modal-footer"><button class="btn btn-primary" ng-click="yes()">Yes</button><button class="btn btn-warning" ng-click="no()">No</button></div>';

		var modalInstance = $modal.open({
			template: modalHtml,
			controller: ModalInstanceCtrl
		});

		modalInstance.result.then(function() {
			ProfileService.destroy(profileId)
				.then(function(result) {
					$scope.addAlert(result);
					$scope.cancelEditing();
					$scope.getProfiles();
				});
		});
	};

	$scope.initCreateForm = function() {
		$scope.newProfile = {atHandle: "", email: "", phone: ""};
	};

	$scope.setEditedProfile = function(profile) {
		$scope.editedTweet = angular.copy(profile);
		$scope.isEditing = true;
	};

	$scope.cancelEditing = function() {
		$scope.editedProfile = null;
		$scope.isEditing = false;
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.getProfiles();
	$scope.initCreateForm();
}]);

var ModalInstanceCtrl = function($scope, $modalInstance) {
	$scope.yes = function() {
		$modalInstance.close();
	};

	$scope.no = function() {
		$modalInstance.dismiss("cancel");
	};
};