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
			var saved = isUserInList($('#user_name').val().trim(), userlist);
			if (saved != 0 ) {
				updateFeedback($('#user_name').val().trim(), saved);			
			} else {
				saveNewUser(userlist.length + 1, $('#user_name').val().trim());
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
		updateFeedback($('#user_name').val().trim(), 0);
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
	username = $('#user_name').val().trim();
	if (username) {
		return true;
	} 
	return false;
}

function updateFeedback(name, saved) {
	if ($('#feedback')) {
		$('#feedback').remove();
	}
	$('.element').append($('<label></label>').attr("id", "feedback")).addClass("feedback");	
	if (saved == 0) {
		$('#feedback').html("New user \"" + name + "\" is saved.");
	}

	if (saved == 1) {
		$('#feedback').html("User name \"" + name + "\" already exists.");
	} 

	if (saved == -1){
		$('#feedback').html("Please input a correct user name.");
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

