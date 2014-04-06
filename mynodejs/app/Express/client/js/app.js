var main = function () {
	"use strict";

	$.getJSON("/counts.json", function (wordcounts) {
		console.log("wordcounts: " + wordcounts);
	});

}

$(document).ready(main);