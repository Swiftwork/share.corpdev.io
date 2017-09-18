/* Import */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const environment = require('../environment.js')(process.env.NODE_ENV);

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let router, dev, compiler;
if (process.env.NODE_ENV === 'development') {
  dev = require('./dev.js');
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(helmet());

/* Static Assets */
app.use(express.static(environment.DIRS.PUBLIC));
app.use('/content', express.static(environment.DIRS.CONTENT));
app.use('/static', express.static(environment.DIRS.STATIC));

//------------------------------------------------------------------------------------
// AD TEST
//------------------------------------------------------------------------------------

const ActiveDirectory = require('activedirectory');
const config = {
  url: 'ldap://corpdev.io',
  baseDN: 'ou=DigitalBusiness,ou=Users,ou=CORPDEV,dc=corpdev,dc=io',
  username: 'E603362@corpdev.io',
  password: 'Test1234',
}
const ad = new ActiveDirectory(config);
var username = 'erik.hughes@evry.com';
var password = 'Mav2Y/83n8vZ';

ad.authenticate(username, password, function (err, auth) {
  if (err) {
    console.log('ERROR: ' + JSON.stringify(err));
    return;
  }

  if (auth) {
    console.log('Authenticated!');
  }
  else {
    console.log('Authentication failed!');
  }
});

//------------------------------------------------------------------------------------
// SOCKET IO
//------------------------------------------------------------------------------------

io.on('connection', (client) => {
  console.log('Client connected...', client.id);
});

//------------------------------------------------------------------------------------
// BUILD AND HOT RELOAD FOR DEVELOPMENT
//------------------------------------------------------------------------------------

if (process.env.NODE_ENV === 'development') {
  compiler = dev.devMode(app);
};

//------------------------------------------------------------------------------------
// ENDPOINTS
//------------------------------------------------------------------------------------

router = require('./endpoints/index.js')(io);
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    router = require('./endpoints/index.js')(io);
    dev.devRoutes(compiler, router);
  } else {
    router.get('*', (req, res) => {
      return res.status(200).sendFile(path.join(__dirname, 'public/index.html'));
    });
  }
  router(req, res, next);
});

//------------------------------------------------------------------------------------
// SERVER
//------------------------------------------------------------------------------------

/* Init Server */
server.listen(environment.PORT, environment.HOST, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Website is hosted at http://${host}:${port}`);
});

