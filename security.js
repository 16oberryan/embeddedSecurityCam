#!/usr/bin/env node

const Blynk = require('/usr/lib/node_modules/blynk-library');
var AUTH = '';
var blynk = new Blynk.Blynk(AUTH);
var v0 = new blynk.VirtualPin(0);
var v1 = new blynk.VirtualPin(1);
var v2 = new blynk.VirtualPin(2);
var v3 = new blynk.VirtualPin(3);

var notify = false;
var filterNotify = false;
var motionOn = false;
var streamOn = false;

const chokidar = require('/usr/lib/node_modules/chokidar');
var request = require('request');
var qs = require('querystring');
var iftttEvent = 'email';
var key = '';
var string = {value1: 'My', value2: 'Test', value3: 'Program'};
var url = 'https://maker.ifttt.com/trigger/' + iftttEvent + '/with/key/' + key + '?' + qs.stringify(string);

var exec = require('child_process').exec;
var psTree = require('ps-tree');
var child;

var kill = function(pid, signal, callback) {
	signal = signal || 'SIGKILL';
	callback = callback || function () {};
	var killTree = true;
	if(killTree) {
		psTree(pid, function (err, children) {
			[pid].concat(children.map(function (p) {
				return p.PID;
				})
			).forEach(function (tpid) {
				try { process.kill(tpid, signal) }
				catch (ex) {}
			});
			callback();
		});
	} else {
		try { process.kill(pid, signal) }
		catch (ex) {}
		callback();
	}
};

//console.log(url);
//process.argv[2] is the first command line argument
chokidar.watch('./motionLog', {ignoreInitial: true}).on('all', (event, path) => {
	//console.log(event);
	//console.log(path);
	if (notify && (path.endsWith(".avi") || !filterNotify)) { // filter based on file type
		request(url, function(err, res, body) {
			if (!err && res.statusCode == 200) {
				console.log(body);
			} else {
				console.log("error=", + err + " response=" + JSON.stringify(res));
			}
		});
	}
});

v0.on('write', function(param) {
	//toggle motion command
	//console.log('V0:', param[0]);
	if (param[0] == 1) {
		console.log("starting motion");
		motionOn = true;
		if (streamOn) {
			child = exec('motion -c motionS.conf');
		} else {
			child = exec('motion -c motion.conf');
		}
	} else {
		console.log("killing motion");
		motionOn = false;
		try { kill(child.pid); }
		catch(error) {console.log("Motion not running");}
	}
});

v1.on('write', function(param) {
	//toggle streaming
	if (motionOn) {
		kill(child.pid);
		if (streamOn) {
			console.log("turning off streaming");
			child = exec('motion -c motion.conf');
		} else {
			console.log("turning on streaming");
			child = exec('motion -c motionS.conf');
		}
	}
	streamOn = param[0];
});

v2.on('write', function(param) {
	notify = param[0];
});

v3.on('write', function(param) {
	filterNotify = param[0];
});
