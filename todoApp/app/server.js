var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express();

// set up a static file directory to use for default routing
// also see the note below about Windows
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());

// Connect to the amazerrific data store in mongo
mongoose.connect('mongodb://localhost/amazerrific');

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

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

app.get("/todos.json", function (req, res) {
	// res.json returns the entire object as a JSON file
	//res.json(tweetCounts);
	ToDo.find({}, function (err, toDos) {
		// check for errors
		res.json(toDos);
	});
});

app.post("/todos", function (req, res) {
	console.log(req.body);
	var newToDo = new ToDo({"description":req.body.description,
							"tags":req.body.tags});

	newToDo.save(function (err, result) {
	if (err !== null) {
		console.log(err);
		res.send("ERROR");
	} else {
	
		// our client expects *all* of the todo items to be returned,
		// so we do an additional request to maintain compatibility
		ToDo.find({}, function (err, result) {
			if (err !== null) {
				// the element did not get saved!
				res.send("ERROR");
			}
			res.json(result);
		});
		
	}
	});
});

console.log("Server running on port 3000");
