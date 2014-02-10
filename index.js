"use strict";
var USERLIST = "http://172.16.1.100/user/list/json";
var ADDNEWUSER = "http://172.16.1.100/user/list/add";  // server should implement this API

document.observe("dom:loaded", function() {
	$$("button")[0].observe("click", getUserList);
});

function getUserList() {
	new Ajax.Request(USERLIST, {
		method : "get",
		parameters : {
		},
		onSuccess : function(ajax) {
			var resp = JSON.parse(ajax.responseText);
			if (resp.status == "success") {
                			var userList = resp.results;
                			var username = $("user_name").value;
               			 if (isInUserList(username, userList) == 1) {
                    				alert("User is in the list.");
                			} else if (isInUserList(username, userList) == 0){
                    				saveNewUser(userList.length + 1);
                			} else {
                    				alert("Please input a valid username.");
                			}
			} 
		},
		onFailure : function() {
			alert("User resource is not available.");
		}
	});
};


function saveNewUser(newid) {
	new Ajax.Request(ADDNEWUSER, {
		method : "post",
		parameters : {
            id : newid;
            username: $("user_name").value;
		},
		onSuccess : function(ajax) {
            		alert("New user is saved.");
		},
		onFailure : function() {
			alert("Saving user is failed.");
		}
	});
    
};


function isUserInList(username, userList) {
    if (!username || !username.trim()) 
        return -1;
    if (userList.length == 0)
        return 0; 
    for (var i = 0; i < userList.length; i++) {
        if (username == userList[i].name)
            return 1;      
    }
    return 0; 
};
