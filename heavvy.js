var http = require('http'),
	fs = require('fs'),
	config = {
		port : 9615,
		file : 'plop.txt',
		contentType : 'text/html',
		cache : 10 // 60 secs = 1 minute
	}

// the app
var heavvy = {
	readfile : function(callback){
		fs.readFile(__dirname+'/'+ config.file, function(err, data){
			if(err) throw err;
			callback(data);
		});
	},
	iscache : function(){
		console.log(Date.now() - date);
		return Date.now() - date < config.cache;
	}
};


// init defaults
var rawcontent = null, date = Date.now();
config.cache = config.cache * 1000;
heavvy.readfile(function(data){
	console.log(' will be heavily served: '+data.length+ 'o');
	rawcontent = data;
});


// the server
http.createServer(function (req, res) {

	res.writeHead(200, {
		'Content-type': config.contentType
	});

	if(!heavvy.iscache()){
		heavvy.readfile(function(data){
			res.end(data);
			
			// store into cache and reset last date
			rawcontent = data;
			date = Date.now();
		});
	}
	else{
		// use cache
		res.end(rawcontent);
	}

}).listen(config.port);

console.log('http://localhost:'+config.port);