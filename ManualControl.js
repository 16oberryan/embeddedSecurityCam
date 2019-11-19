!/usr/bin/env node
const Blynk = require('blynk-library');
const b = require('bonescript');
const util = require('util');

const VSERV = 'P9_14';
const HSERV = 'P9_16';

b.pinMode(VSERV, b.OUTPUT);
b.pinMode(HSERV, b.OUTPUT);

const AUTH = 'vk3EctrUH-TNNdc9rJJca2X-Nwt4_73X';

var blynk = new Blynk.Blynk(AUTH);

var v4 = new blynk.VirtualPin(4);
var v5 = new blynk.VirtualPin(5);

//b.analogWrite(VSERV, (90*.064)/100, 60);

function printStatus(x){
        console.log("woo")
}

v4.on('write', function(param) {
      var duty_cycle = param[0]*.064;
      console.log('Vertical:', duty_cycle);
      b.analogWrite(VSERV, duty_cycle/100, 60);
});

v5.on('write', function(param) {
      var duty_cycle = param[0]/100;
      console.log('Horizontal:', duty_cycle);
      b.analogWrite(HSERV, duty_cycle);
});

