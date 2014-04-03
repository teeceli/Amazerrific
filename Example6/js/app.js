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

var organizedByTagsObject = {};

// Much better way of handling the tab implementation. Uses a for loop to iterate through all of the tab elements in the DOM
$(".tabs a span").toArray().forEach(function (element) {

	$(element).on("click", function () {
		$(".tabs span").removeClass("active");
		$(element).addClass("active");
		$("main .content").empty();
		$("main .comment-input").empty();


		var $element = $(element);
		var $content;
		var $commentInput, $descriptionInput;

		// NEWEST
		if ($element.parent().is(":nth-child(1)")) {

			$content = $("<ul>");
			// Display contents of toDos array in reverse order
			for (var i = toDos.length - 1; i >= 0; i--) {
				$content.append($("<li>").text(toDos[i]))
				$("main .content").append($content);
			}

		// OLDEST
		} else if ($element.parent().is(":nth-child(2)")) {
			
			$content = $("<ul>");
			
			// Display contents of toDos array in current order
			toDos.forEach(function (todo) {
				$content.append($("<li>").text(todo));
				$("main .content").append($content);

				//var content2 = "<ul><li>" + todo + "</li>";  // How I would have probably done it. Works this way as well, just less fancy
				//$("main .content").append(content2);
			});
		
		// TAGS
		} else if ($element.parent().is(":nth-child(3)")) {
			
		var $tagName = "";
		var $content = $("<ul>");
		var $li = $("<li>");
		//var organizedByTagsObject = {};

		$.getJSON("todos.json", function (tagObject) {
			organizedByTagsObject = organizeByTags(tagObject);
			//console.log("organizedByTagsObject: " + organizedByTagsObject);

			organizedByTagsObject.forEach(function (tagGroup) {
				var $tagName = $("<h3>").text(tagGroup.name);

					$content.append($tagName);
					tagGroup.toDos.forEach(function (toDos) {
						$content.append( $("<li>").text(toDos));
					});

					$("main .content").append($content);
			});
		});


		// ADD TODO
		} else if ($element.parent().is(":nth-child(4)")) {
			
			// Add new item text and button for third tab
			$descriptionInput = ($("<span class='comment'><p> Description: </p></span>"));
			$descriptionInput.append($("<input id='description' type='text'>"));

			$commentInput = ($("<span class='comment'><p> Tags: </p></span>"));
			var $button = $("<button>").text("+");

			//$commentInput.append($("<input class='tagButton' type='text'>"));
			$commentInput.append($("<input id='tagButton' type='text'>"));

			$commentInput.append($button);

			$button.on("click", function () {
				//var $tagInput = $(".tagButton");
				var $tagInput = $("#tagButton").val();
				var description = $("#description").val();
				var tagArray = [];

				tagArray = $tagInput.split(",");
				console.log("tagArray: " + tagArray[0]);

				//toDosObject.push({"description":description, "tags":tagArray});
				
				// update toDos
				//toDos = toDoObjects.map(function (toDo) {
					//return toDo.description;
				//});

				// clear out form
				$("input").val("");

			});

			$("main .content").append($descriptionInput);
			$("main .content").append("<br>");
			$("main .content").append($commentInput);



		}
		return false;
	});
});

// Set up "fake" first click to show first tab
$(".tabs a:first-child span").trigger("click");

};

// Take old json object and remap to key off of tags instead of descriptions. Also change keys to name and toDos
var organizeByTags = function (tagObject) {
	var tagArray = [];
	var originalJsonArray = [];
	var newJsonArray = [];


	var tagOrganized = tagObject.map(function (maps) {
		
		var object = {};
		object.name = maps.tags;
		object.toDos = maps.description;
		//originalJsonArray.push(object);	

		object.name.forEach(function (individualTags) {
			var newObject = {};
			newObject.toDos = [];

		  if (tagArray.indexOf(individualTags) == -1) {
			newObject.name = individualTags;

			tagObject.map(function (map2) {
				if (map2.tags.indexOf(individualTags) != -1) {
					newObject.toDos.push(map2.description);
				}
			});

			tagArray.push(individualTags);
			newJsonArray.push(newObject);
		  } 

		});

	});

	//var originalJsonStringified = JSON.stringify(originalJsonArray);
	var newJsonStringified = JSON.stringify(newJsonArray);

	console.log("newJsonStringified: " + newJsonStringified);
	var jsonObject = jQuery.parseJSON(newJsonStringified);
	return jsonObject;

};

//$(document).ready(main);
$(document).ready(function () {
	$.getJSON("todos.json", function (toDosObject) {
		main(toDosObject);
	});

});

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

