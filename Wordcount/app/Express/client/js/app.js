var main = function () {
	"use strict";

	//$.getJSON("/counts.json", function (wordcounts) {
	//	console.log("wordcounts: " + wordcounts);
	//	awesomeCount = wordcounts.awesome;
	//	$(" .awesomeCount").append(awesomeCount);
	//});

	setInterval(function () {
		$.getJSON("/counts.json", function (wordcounts) {
			console.log("awesome: " + wordcounts.awesome);

			var awesomeCount = wordcounts.awesome;
			var $br = $("<br>");

			$(" .awesomeSpan").append(awesomeCount);
			$(" .awesomeSpan").append($br);
		});
	}, 5000);

}



$(document).ready(main);