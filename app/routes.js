var express = require("express");
var Profile = require("./models/profile");

/**
 * creates a message containing a success condition
 *
 * @param message text describing the successful result
 * @returns Object successful condition to report to the API
 **/
function createSuccessfulMessage(message) {
	var reply = {};
	reply.status = 200;
	reply.message = message;
	return(reply);
}

/**
 * creates an object containing a successful result of a query
 *
 * @param data result of the query to encapsulate
 * @returns Object successful query result to report to the API
 **/
function createSuccessfulReply(data) {
	var reply = {};
	reply.status = 200;
	reply.data = data;
	return(reply);
}

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

				response.json(createSuccessfulMessage("profile created"));
			});
		})

		// get all profiles
		.get(function(request, response){
			Profile.find(function(error, profiles) {
				// if this evaluates to true, it stops the method after response.send();
				if(error) {
					response.send(error);
				}

				response.json(createSuccessfulReply(profiles));
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

				response.json(createSuccessfulReply(profile));
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

					response.json(createSuccessfulMessage("profile updated"));
				});
			});
		})

		// delete a specific profile
		.delete(function(request, response) {
			Profile.remove({
				_id: request.params.profileId
			}, function(error, profile){
				// if this evaluates to true, it stops the method after response.send();
				if(error) {
					response.send(error);
				}

				response.json(createSuccessfulMessage("profile deleted"));
			});
		});

	// all of our routes will be prefixed with /api
	app.use("/api", router);

	// example front end route
	app.get("*", function(request, response) {
		var path = require("path");
		response.sendFile(path.join(__dirname, "../public/views", "index.html"));
	});
};