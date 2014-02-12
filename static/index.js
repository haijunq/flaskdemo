//"use strict";
var USERLIST = "/userlist";
var ADDNEWUSER = "/addnewuser";

$(document).ready(function() {
	$('form').submit(getUserList);
});

function alertme() {
	alert("me");
}

function getUserList(event) {
	if (!isInputValid()) {
		updateFeedback("", -1);
		return false;
	}
	
	$.ajax({
		type : "GET",
		url : USERLIST,
	}).done(function(ajax) {
		var resp = $.parseJSON(ajax);
		if (resp.status == "success") {
			var userlist = resp.results;
			var username = $('#user_name').val().trim();
			var username_escaped = $('<div/>').text(username).html();
			var saved = isUserInList(username_escaped, userlist);
			if (saved != 0 ) {
				updateFeedback(username_escaped, saved);			
			} else {
				saveNewUser(userlist.length + 1, username_escaped);
			}
		}
	});
	return false;
}

function saveNewUser(id, username) {
	$.ajax({
		type : "POST",
		url : ADDNEWUSER,
		dataType: "json",
	    contentType: 'application/json;charset=UTF-8',
		data : JSON.stringify({
			"id" : id,
			"name" : username
		})
	}).done(function(msg) {
		var username = $('#user_name').val().trim();
		var username_escaped = $('<div/>').text(username).html();
		updateFeedback(username_escaped, 0);
	});
}


function isUserInList(username, userlist) {
	if (userlist.length == 0)
		return 0;
	for (var i = 0; i < userlist.length; i++) {
		if (username == userlist[i].name)
			return 1;
	}
	return 0;
}

function isInputValid() {
	var username = $('#user_name').val().trim();
	var username_escaped = $('<div/>').text(username).html();
	if (username_escaped) {
		if (username_escaped.length <= 40) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function updateFeedback(name, saved) {
	if ($('#feedback')) {
		$('#feedback').remove();
	}
	$('.element').append($('<label></label>').attr("id", "feedback")).addClass("feedback");	
	if (saved == 0) {
		$('#feedback').text("New user \"" + $('<div/>').html(name).text() + "\" is saved.");
	}

	if (saved == 1) {
		$('#feedback').text("User name \"" + $('<div/>').html(name).text() + "\" already exists.");
	} 

	if (saved == -1){
		$('#feedback').text("Please input a correct user name less than 40 characters.");
	}
}

//
// function getUserList() {
// alert("html");
// new Ajax.Request(USERLIST, {
// method : "get",
// parameters : {
// },
// onSuccess : function(ajax) {
// var resp = JSON.parse(ajax.responseText);
// if (resp.status == "success") {
// var userList = resp.results;
// var username = $("user_name").value;
// if (isInUserList(username, userList) == 1) {
// alert("User is in the list.");
// } else if (isInUserList(username, userList) == 0){
// saveNewUser(userList.length + 1);
// } else {
// alert("Please input a valid username.");
// }
// }
// },
// onFailure : function() {
// alert("User resource is not available.");
// }
// });
// };
//
//
// function saveNewUser(newid) {
// new Ajax.Request(ADDNEWUSER, {
// method : "post",
// parameters : {
// id : newid,
// username: $("user_name").value
// },
// onSuccess : function(ajax) {
// alert("New user is saved.");
// },
// onFailure : function() {
// alert("Saving user is failed.");
// }
// });
//    
// };
//

