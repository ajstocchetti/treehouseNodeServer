var fs = require('fs');

function mergeVals(fileContents, values) {
	for(var key in values) {
		fileContents = fileContents.replace("{{"+key+"}}", values[key]);
	}
	return fileContents;
}

function view(templateName, values, response) {
	// read from template
	/*
	fs.readFile("./views/" + templateName + ".html", function(error, contents) {
		if(error) throw error;
		response.write(contents);
	});
	*/
	var fileContents = fs.readFileSync("./views/" + templateName + ".html", {encoding: "utf8"});
	
	// insert values into content
	fileContents = mergeVals(fileContents, values);
	
	// respond
	response.write(fileContents);
}


module.exports.view = view;