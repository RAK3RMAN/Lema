/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/app.js
Description  : Initializes express and node 
               processes, route logic
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//===================================================//
//     --- Initialize Packages and Routers ---       //
//===================================================//

//Declare Packages
var express = require('express');
var logger = require('morgan');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var ip = require('ip');

//Setup External Connections
let port = process.env.PORT || process.argv[2];
let lemaengine = process.env.LEMAENGINE || process.argv[3];

//Declare App
const app = express();
app.set('view engine', 'ejs');

//Routers
var authenticationRouter = require('./routes/authentication');
var materialRouter = require('./routes/material');

//Other Processes Setup
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(process.cwd() + '/static'));

//End of Initialize Packages and Routers - - - - - - - -


//===================================================//
//        --- Page Specific Routes/Logic ---         //
//===================================================//

//Material
app.get('/', materialRouter.dashMain);

//End of Page Specific Routes/Logic - - - - - - - - - -


//===================================================//
//              --- Error Handlers ---               //
//===================================================//

//404 - Send to Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler Logic
app.use(function(err, req, res, next) {
  //Determine Message
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //Render Error Page
  res.status(err.status || 500);
  res.render('pages/error.ejs', { title: 'ERROR' });
});

//End of Error Handler - - - - - - - - - - - - - - - - -


//===================================================//
//               --- Port Listen ---                 //
//===================================================//

app.listen(port, function () {
    console.log('Node.js Startup - Lema Console');
    console.log('Lema Console Accessable at: ' + ip.address() + ":" + port);
    console.log('LEMAEngine Accessed at: ' + lemaengine);
});

//End of Port Listen - - - - - - - - - - - - - - - - -

module.exports = app;
