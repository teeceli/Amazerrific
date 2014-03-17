var main = function () {
	"use strict";

	var addCommentFromInputBox = function () {
		var $new_comment;
		if ($(".comment-input input").val() !== "") {
			$new_comment = $("<p>").text($(".comment-input input").val());
			$new_comment.hide();
			$(".comments").append($new_comment);
			$new_comment.fadeIn();
			$(".comment-input input").val("");
		}
	};

	$(".comment-input button").on("click", function (event) {
		addCommentFromInputBox();
	});

	$(".comment-input input").on("keypress", function (event) {
		if (event.keyCode === 13) {
			addCommentFromInputBox();
		}
	});
};
$(document).ready(main);

/* Old way with duplicated code and redundancy
   Left it here to show what not to do

var main = function () {
	"use strict";
	//window.alert("Hello World");

	$(".comment-input button").on("click", function (event) {
		if ($(".comment-input input").val() != "") {
			var $new_comment = $("<p>");
			var	comment_text = $(".comment-input input").val();
		
			$new_comment.text(comment_text);
			$new_comment.hide();
			$(".comments").append($new_comment);
			$new_comment.fadeIn();
			$(".comment-input input").val("");
		}
		//console.log("Hello World");
	});

	$(".comment-input input").on("keypress", function (event) {
			//console.log("keycode: " + event.keycode);
		if (event.keyCode == 13) {
			var $new_comment = $("<p>");
			var	comment_text = $(".comment-input input").val();
		
			$new_comment.text(comment_text);
			$new_comment.hide();
			$(".comments").append($new_comment);
			$new_comment.fadeIn();

			$(".comment-input input").val("");
		}

	});
};

$(document).ready(main);
*/