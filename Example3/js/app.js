var main = function () {
	"use strict";

	var toDos = [
		"Finish writing this book",
		"Take Gracie to the park",
		"Answer emails",
		"Prep for Monday's class",
		"Make up some new ToDos",
		"Get Groceries"
	];


// Much better way of handling the tab implementation. Uses a for loop to iterate through all of the tab elements in the DOM
$(".tabs a span").toArray().forEach(function (element) {

	$(element).on("click", function () {
		$(".tabs span").removeClass("active");
		$(element).addClass("active");
		$("main .content").empty();
		$("main .comment-input").empty();


		var $element = $(element);
		var $content;
		var $commentInput;

		if ($element.parent().is(":nth-child(1)")) {

			$content = $("<ul>");
			// Display contents of toDos array in reverse order
			for (var i = toDos.length - 1; i >= 0; i--) {
				$content.append($("<li>").text(toDos[i]))
				$("main .content").append($content);
			}
			//console.log("first tab clicked");

		} else if ($element.parent().is(":nth-child(2)")) {
			
			$content = $("<ul>");
			// Display contents of toDos array in current order
			toDos.forEach(function (todo) {
				$content.append($("<li>").text(todo));
				$("main .content").append($content);

				//var content2 = "<ul><li>" + todo + "</li>";  // How I would have probably done it. Works this way as well, just less fancy
				//$("main .content").append(content2);
			});
			//console.log("second tab clicked");
		

		} else if ($element.parent().is(":nth-child(3)")) {
			
			// Add new item text and button for third tab
			$commentInput = ($("<span class='comment'><p> Add a New Item: </p></span>"));
			$commentInput.append($("<input type='text'><button>+</button>"));

			$("main .content").append($commentInput);

			//console.log("third tab clicked");
		}
		return false;
	});
});

// Set up "fake" first click so first tab shows
$(".tabs a:first-child span").trigger("click");

};

$(document).ready(main);

	/* Older method of tab implementation that uses a function with the tabnumber passed in

	var makeTabActive = function (tabnumber) {
		var tabSelector = ".tabs a:nth-child("+tabnumber+") span";
		$(".tabs span").removeClass("active");
		$(tabSelector).addClass("active");
		$("main .content").empty();
	};

	$(".tabs a:nth-child(1)").on("click", function () {
		makeTabActive(1);
		// return false so we don't follow the link
		return false;
	})

	$(".tabs a:nth-child(2)").on("click", function () {
		makeTabActive(2);
		// return false so we don't follow the link
		return false;
	});

	$(".tabs a:nth-child(3)").on("click", function () {
		makeTabActive(3);
		// return false so we don't follow the link
		return false;
	});
*/
