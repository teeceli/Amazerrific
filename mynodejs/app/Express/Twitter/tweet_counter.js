var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	counts = {},
	twitter;

// set up our twitter object
twitter = ntwitter(credentials);

counts.awesome = 0;

// set up our twitter stream with three parameters,
// separated by commas
twitter.stream(
	
	// the first parameter is a string
	"statuses/filter",

	// second parameter, an object containing an array
	{ "track": ["awesome", "cool", "rad", "gnarly", "groovy"] },
	//{ "track": ["teeceli"] },

	
	// the third parameter is our callback for when the stream is created
	function(stream) {
		stream.on("data", function(tweet) {

			if (tweet.text.indexOf("awesome") != -1) {
				counts.awesome++;
			}

			//console.log(tweet.text);
			//console.log("---------");
		});
	}
);

setInterval(function () {
	console.log("awesome: " + counts.awesome);
}, 3000);

module.export = counts;