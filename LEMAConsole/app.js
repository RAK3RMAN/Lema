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
let express = require('express');
let morgan = require('morgan');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let ip = require('ip');
let mongoose = require('mongoose');
let passport = require('passport');
let flash = require('connect-flash');
let bodyParser = require('body-parser');
let session = require('express-session');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//Declare App
const app = express();
app.set('view engine', 'ejs');

//Routers
let authRouter = require('./routes/authRoutes.js');
let materialRouter = require('./routes/materialRoutes.js');
let nodeRouter = require('./routes/nodeRoutes.js');

//Resolvers
let auth = require('./resolvers/authResolver.js');

//Database Setup
//TODO Create Database connection handler
mongoose.connection.on('connected', function () {
    console.log('MongoDB: Connected')
});
mongoose.connection.on('timeout', function () {
    console.log('MongoDB: Error')
});
mongoose.connection.on('disconnected', function () {
    console.log('MongoDB: Disconnected')
});
mongoose.connect(storage.get('mongodb_url'), {useNewUrlParser: true, connectTimeoutMS: 10000});

//Passport Setup
require('./sys_funct/passport.js')(passport);
app.use(session({secret: storage.get('session_secret')})); //Session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Other Processes Setup
app.use(cookieParser());
app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static(process.cwd() + '/static'));

//End of Initialize Packages and Routers - - - - - - - -


//===================================================//
//        --- Page Specific Routes/Logic ---         //
//===================================================//

//Forward Node Routes
nodeRouter(app);

//Material Routes
app.get('/', auth.isLoggedIn, materialRouter.dashMain);
app.get('/node/list', auth.isLoggedIn, materialRouter.nodeList);
app.get('/setup', auth.isLoggedIn, materialRouter.sysSetup);

//Auth Routes
app.get('/login', authRouter.loginPage);
app.get('/signup', authRouter.signupPage);
app.get('/logout', function (req, res) {
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
app.use(function (req, res, next) {
    next(createError(404));
});

// Error Handler Logic
app.use(function (err, req, res, next) {
    //Determine Message
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //Render Error Page
    res.status(err.status || 500);
    res.render('pages/error.ejs', {title: 'Error'});
});

//End of Error Handler - - - - - - - - - - - - - - - - -


//===================================================//
//               --- Port Listen ---                 //
//===================================================//

app.listen(storage.get('console_port'), function () {
    console.log(' ');
    console.log('==============================================');
    console.log(' LEMAConsole ~ Startup | Created By: RAk3rman ');
    console.log('==============================================');
    console.log('Lema Console Accessable at: ' + ip.address() + ":" + storage.get('console_port'));
    console.log('MongoDB Accessed at: ' + storage.get('mongodb_url'));
    console.log(' ');
});

//Declare Console Functions
let configManager = require('./config/configManager.js');
let checkConnect = require('./sys_funct/checkConnect.js');

//End of Port Listen - - - - - - - - - - - - - - - - -

module.exports = app;