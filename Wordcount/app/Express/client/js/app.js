var main = function () {
	"use strict";

	var oldCount = 0;
	var newCount = 0;

	var insertCountIntoDOM = function (tweets) {

		newCount = tweets.length;
		
		// only append if new tweets exist
		if (newCount != oldCount) {
			
			// Clear out tweets so there are no duplicates
			$(" .awesomeSpan").empty();

			tweets.forEach(function (tweet) {
				$(" .awesomeSpan").append("<p>");
				$(" .awesomeSpan").append("-----  ");
				$(" .awesomeSpan").append(tweet);
			});
			
			oldCount = newCount;
		}
	};

	setInterval(function () {

		$.getJSON("/counts.json", insertCountIntoDOM); 

	}, 2000);

	setInterval(function () {
		// refresh page
		$(" .awesomeSpan").empty();

	}, 20000);

}

$(document).ready(main);