//---------------------------------------------------------------
// The purpose of this program is to check if our emitter
// was working properly!
//
// TO RUN THIS EXAMPLE
// 1. type node 3_testEmitter.js on the command line
//---------------------------------------------------------------

var Ticker = require("./2_myEmitter"); // that's a function

var ticker = new Ticker(); // here we construct an object


// attach handlers
ticker.on ('tick', function(cnt) {
   console.log("-- Tick event handled: ", cnt); 
});

ticker.on ('dong', function() {
   console.log("-- Dong event handled --"); 
});
