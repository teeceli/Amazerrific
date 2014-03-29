var main = function () {
	"use strict"

	var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
				"tags=dogs&format=json&jsoncallback=?";

	$.getJSON(url, function (flickrResponse) {
		flickrResponse.items.forEach(function (item) {
			console.log(item.media.m);
			var $img = $("<img>").hide();
			$img.attr("src", item.media.m);
			$("main").append($img);
			$img.fadeIn();

		});
		console.log(flickrResponse);
	});

	//console.log("hello");
};
$(document).ready(main);