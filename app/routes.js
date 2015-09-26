var express = require("express");
var Profile = require("./models/profile");

module.exports = function(app) {
	// get an instance of the express Router
	var router = express.Router();

	// middleware to use for all requests
	router.use(function(request, response, next) {
		next(); // make sure we go to the next routes and don't stop here
	});

	router.get("/", function(request, response) {
		response.json({status: 200, message: "API seems to be working OK"});
	});

	// universal profile route
	router.route("/profile")
		// save a new profile
		.post(function(request, response) {
			var profile = new Profile();
			profile.atHandle = request.body.atHandle;
			profile.email = request.body.email;
			profile.phone = request.body.phone;

			profile.save(function(error) {
				// if this evaluates to true, it stops the method after response.send();
				if(error) {
					response.send(error);
				}

				response.json({status: 200, message: "profile created"});
			});
		})

		// get all profiles
		.get(function(request, response){
			Profile.find(function(error, profiles) {
				// if this evaluates to true, it stops the method after response.send();
				if(error) {
					response.send(error);
				}

				response.json(profiles);
			});
		});

	// specific profile route
	router.route("/profile/:profileId")
		// get a specific profile
		.get(function(request, response){
			Profile.findById(request.params.profileId, function(error, profile) {
				// if this evaluates to true, it stops the method after response.send();
				if(error) {
					response.send(error);
				}

				response.json(profile);
			});
		})

		// update a specific profile
		.put(function(request, response) {
			Profile.findById(request.params.profileId, function(error, profile) {
				// if this evaluates to true, it stops the method after response.send();
				if(error) {
					response.send(error);
				}

				profile.atHandle = request.body.atHandle;
				profile.email = request.body.email;
				profile.phone = request.body.phone;

				profile.save(function(error) {
					// if this evaluates to true, it stops the method after response.send();
					if(error) {
						response.send(error);
					}

					response.json({status: 200, message: "profile updated"});
				});
			});
		})

		.delete(function(request, response) {
			Profile.remove({
				_id: request.params.profileId
			}, function(error, profile){
				// if this evaluates to true, it stops the method after response.send();
				if(error) {
					response.send(error);
				}

				response.json({status: 200, message: "profile deleted"});
			});
		});

	// example front end route
	app.get("/", function(request, response) {
		var path = require("path");
		response.sendFile(path.join(__dirname, "../public/views", "index.html"));
	});

	// all of our routes will be prefixed with /api
	app.use("/api", router);
};