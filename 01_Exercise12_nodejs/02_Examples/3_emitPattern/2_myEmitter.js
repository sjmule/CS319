//---------------------------------------------------------------
// The purpose here is to create your very own emitter!
// Users of your program will be able to add listeners and handle 
// events that are fired from YOUR program
// util allows you to use inherits functionality
// events allow you to use the emit functionality
//---------------------------------------------------------------

var util = require('util');
var eventEmitter = require('events').EventEmitter;

// Our function will emit TWO events
// dong - this will be fired on every TEN ticks
// tick - this will also send info on how many times tick was fired
// ** NOTE how tick sends back a parameter to the listener too!
var Ticker = function() {
  var self = this;
  var count= 0;
  setInterval (function() {
       self.emit('tick', ++count);
       if (count % 10 == 0) self.emit('dong');
     }, 1000) ;
};

// This part is crucial. Ticker will inherit important eventEmitter
// functions such as on, removeEventListener etc
util.inherits (Ticker, eventEmitter);

module.exports = Ticker; // here is another way to export a module

