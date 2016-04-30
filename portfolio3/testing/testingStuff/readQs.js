module.exports = {
	readFile: function ()
	{
		var fs = require('fs');
		var obj = JSON.parse(fs.readFileSync('questions.json'));
		return obj;
	}
};
