// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model("Tweet", {
	profileId: String,
	tweetContent: String,
	tweetDate: Date
});