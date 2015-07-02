var Route = require("./router.js");

// create the web server
var http = require("http");
http.createServer(function (request, response) {
	Route.home(request,response);
	Route.user(request,response);
}).listen(3000);
console.log("running...");