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
	$.ajax({
		type : "GET",
		url : USERLIST,
	}).done(function(msg) {
		alert(msg);
		updateFeedback("haijun", 1);
	});
	return false;
}

function updateFeedback(name, saved) {
	if ($('#feedback')) {
		$('#feedback').remove();
	}
	$('.element').append($('<label></label>').attr("id", "feedback")).addClass("feedback");	
	if (saved == 1) {
		$('#feedback').html("New user \"" + name + "\" is saved.");
	}

	if (saved == 0) {
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
//
// function isUserInList(username, userList) {
// if (!username || !username.trim())
// return -1;
// if (userList.length == 0)
// return 0;
// for (var i = 0; i < userList.length; i++) {
// if (username == userList[i].name)
// return 1;
// }
// return 0;
// };
