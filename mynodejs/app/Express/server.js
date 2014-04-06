var express = require("express"),
	http = require("http"),
	tweetCounts = require("./Twitter/tweet_counter.js"),
	app = express();

// set up a static file directory to use for default routing
// also see the note below about Windows
app.use(express.static(__dirname + "/client"));

// Create our Express-powered HTTP server
// and have it listen on port 3000
http.createServer(app).listen(3000);

// set up our routes
app.get("/", function (req, res) {
	res.send("root");
});

app.get("/hello", function (req, res) {
	res.send("Hello World!");
});

app.get("/goodbye", function (req, res) {
	res.send("Goodbye World!");
});

app.get("/counts.json", function (req, res) {
	// res.json returns the entire object as a JSON file
	res.json(tweetCounts);
});