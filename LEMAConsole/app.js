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
let uuidv4 = require('uuid/v4');
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./config/apiDoc.json');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//System Config Checks - - - - - - - - - - - - - - - - -
//Session Secret Check
let session_secret = storage.get('session_secret');
if (session_secret === undefined) {
    let newSecret = uuidv4();
    storage.set('session_secret', newSecret);
    console.log('Lema Config Manager: Session Secret Set - ' + newSecret);
}
//Console Port Check
let console_port = storage.get('console_port');
if (console_port === undefined) {
    storage.set('console_port', 3000);
    console.log('Lema Config Manager: Console Port Set to DEFAULT: 3000');
}
//MongoDB URL Check
let mongodb_url = storage.get('mongodb_url');
if (mongodb_url === undefined) {
    storage.set('mongodb_url', 'mongodb://localhost:27017');
    console.log('Lema Config Manager: MongoDB URL Set to DEFAULT: mongodb://localhost:27017');
}
//Debug Mode Check
let debug_mode = storage.get('debug_mode');
if (debug_mode === undefined) {
    storage.set('debug_mode', 'false');
    console.log('Lema Config Manager: Debug Mode Set to DEFAULT: false');
}
//Public Secret Check
let public_secret = storage.get('public_secret');
if (public_secret === undefined) {
    let newSecret = uuidv4();
    storage.set('public_secret', newSecret);
    console.log('Lema Config Manager: Public Secret Set - ' + newSecret);
}
//Initialize Exit Options
let exitOpt = require('./config/exitOpt.js');
setTimeout(exitOpt.testCheck, 3000);
//End of System Config Checks - - - - - - - - - - - - - -

//Declare App
const app = express();
app.set('view engine', 'ejs');

//Routers
let authRouter = require('./routes/authRoutes.js');
let materialRouter = require('./routes/materialRoutes.js');
let nodeRouter = require('./routes/nodeRoutes.js');

//Resolvers
let auth = require('./resolvers/authResolver.js');
let socket = require('./resolvers/socketResolver.js');

//Passport Setup
require('./sys_funct/passport.js')(passport);

//Other Processes Setup
app.use(session({
    secret: storage.get('session_secret'),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
app.get('/node/details/:nodeID', auth.isLoggedIn, materialRouter.nodeDetails);
app.get('/setup', auth.isLoggedIn, materialRouter.sysSetup);
app.use('/api/docs', auth.isLoggedIn, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
//        --- External Connections Setup ---         //
//===================================================//

//Port Listen
let http = require('http');
let server = http.createServer(app);
server.listen(storage.get('console_port'), function () {
    console.log(' ');
    console.log('==============================================');
    console.log(' LEMAConsole ~ Startup | Created By: RAk3rman ');
    console.log('==============================================');
    console.log('Lema Console Accessable at: ' + ip.address() + ":" + storage.get('console_port'));
    console.log('MongoDB Accessed at: ' + storage.get('mongodb_url'));
    console.log(' ');
});

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

//Remove Deprecation Warnings
mongoose.set('useFindAndModify', false);

//Declare Console Functions
let nodeSearch = require('./sys_funct/nodeSearch.js');

//Initialize Socket.io
socket.initialize(server);

//End of External Connections Setup - - - - - - - - - -

module.exports = app;
