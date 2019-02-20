/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/app.js
Description  : Initializes express and node 
               processes, route logic, passport
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//===================================================//
//     --- Initialize Packages and Routers ---       //
//===================================================//

//Declare Packages
var express = require('express');
var morgan = require('morgan');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var ip = require('ip');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');

//Setup External Connections
let port = process.env.PORT || process.argv[2];
let mongodb = process.env.MONGODB || process.argv[3];

//Declare App
const app = express();
app.set('view engine', 'ejs');

//Routers
var authRouter = require('./routes/authRoutes.js');
var materialRouter = require('./routes/materialRoutes.js');
var nodeRouter = require('./routes/nodeRoutes.js');

//Resolvers
let auth = require('./resolvers/authResolver.js');

//Database Setup
mongoose.connect(mongodb);

//Passport Setup
require('./config/passport.js')(passport);
app.use(session({ secret: '98ABS76DF89NANSTDBF98PN8ASYDF' })); //Session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Other Processes Setup
app.use(cookieParser());
app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(process.cwd() + '/static'));

//End of Initialize Packages and Routers - - - - - - - -


//===================================================//
//        --- Page Specific Routes/Logic ---         //
//===================================================//

//Forward Node Routes
nodeRouter(app);

//Material Routes
app.get('/', auth.isLoggedIn, materialRouter.dashMain);
app.get('/setup', auth.isLoggedIn, materialRouter.sysSetup);

//Auth Routes
app.get('/login', authRouter.loginPage);
app.get('/signup', authRouter.signupPage);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});
app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

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
    res.render('pages/error.ejs', { title: 'Error' });
});

//End of Error Handler - - - - - - - - - - - - - - - - -


//===================================================//
//               --- Port Listen ---                 //
//===================================================//

app.listen(port, function() {
    console.log(' ');
    console.log('==============================================');
    console.log(' LEMAConsole ~ Startup | Created By: RAk3rman ');
    console.log('==============================================');
    console.log('Lema Console Accessable at: ' + ip.address() + ":" + port);
    console.log('MongoDB Accessed at: ' + mongodb);
    console.log(' ');
});

//End of Port Listen - - - - - - - - - - - - - - - - -

module.exports = app;