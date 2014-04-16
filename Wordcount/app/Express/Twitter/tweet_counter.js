var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	counts = {},
	tweetArray = [],
	twitter;

// set up our twitter object
twitter = ntwitter(credentials);

//counts.awesome = 0;

// set up our twitter stream with three parameters,
// separated by commas
twitter.stream(
	
	// the first parameter is a string
	"statuses/filter",

	// second parameter, an object containing an array
	//{ "track": ["awesome", "cool", "rad", "gnarly", "groovy"] },
	{ "track": ["awesome"] },

	
	// the third parameter is our callback for when the stream is created
	function(stream) {
		stream.on("data", function(tweet) {

			//if (tweet.text.indexOf("Padres") != -1) {
				console.log(tweet.text);
				//counts.awesome++;
				tweetArray.push(tweet.text);
				console.log("tweet.text: " + tweet.text);
			//}
		});
	}
);

setInterval(function () {
	// clear out tweet array 
	tweetArray.length = 0;
}, 20000);

module.exports = tweetArray;