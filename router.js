var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var queryString = require("querystring");

var standardHeader = {'Content-Type' : 'text/html'};

// home directory
// GET and POST
function home(request, response) {
	if(request.url === "/") {
		if(request.method.toLowerCase() === "get") {
			response.writeHead(200, standardHeader);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();	
		}
		else { // POST
			// get username from post
			request.on("data", function(postBody) {
				var query = queryString.parse(postBody.toString());
				//console.log(postBody.toString());
				response.writeHead(303, {"Location" : "/" + query.username })
				response.end();
			})
			// redirect to /username
		}
	}
}


// /user route
function user(request, response) {
	var username = request.url.replace("/","");
	if(username.length > 0) {
		response.writeHead(200, standardHeader);
		//response.write("Header\n");
		renderer.view("header", {}, response);

		// get JSON from Treehouse
		var studentProfile = new Profile(username);
		
		// success
		studentProfile.on("end", function(profileJSON) {
			var values = {
				gravatarURL : profileJSON.gravatar_url,
				userName : profileJSON.profile_name,
				realName : profileJSON.name,
				badges : profileJSON.badges.length,
				jspts : profileJSON.points.JavaScript
			}

			// write to screen
			renderer.view("profile", values, response);
			renderer.view("footer", {}, response);
			response.end();
		});
		// on error
		studentProfile.on("error", function(error) {
			renderer.view("error", {errorMessage:error.message }, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		})
	}
}


module.exports.home = home;
module.exports.user = user;