app.constant("PROFILE_ENDPOINT", "/api/profile/");
app.service("ProfileService", function($http, PROFILE_ENDPOINT) {
	function getUrl() {
		return(PROFILE_ENDPOINT);
	}

	function getUrlForId(profileId) {
		return(getUrl() + profileId);
	}

	this.all = function() {
		return($http.get(getUrl()));
	};

	this.fetch = function(profileId) {
		return($http.get(getUrlForId(profileId)));
	};

	this.create = function(profile) {
		return($http.post(getUrl(), profile));
	};

	this.update = function(profileId, profile) {
		return($http.put(getUrlForId(profileId), profile));
	};

	this.destroy = function(profileId) {
		return($http.delete(getUrlForId(profileId)));
	};
});