var Profile = require("./models/profile");

module.exports = function(app) {
	// example API route
	app.get("/api/profile", function(request, response) {
		Profile.find(function(error, profiles){
			// if this evaluates to true, it stops the method after response.send();
			if(error) {
				response.send(error);
			}
			response.json(profiles);
		});
	});

	// example front end route
	app.get("*", function(request, response) {
		var path = require("path");
		response.sendFile(path.join(__dirname, "../public/views", "index.html"));
	});
};