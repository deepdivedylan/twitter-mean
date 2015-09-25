// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model("Profile", {
	email: String,
	phone: String,
	atHandle: String
});