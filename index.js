const autobahn = require('autobahn');
const AuthServiceEvents = require('./src/AuthServiceEvents');
global.config = require('./config');

const connection = new autobahn.Connection({
  url:global.config.WAMPROUTER,
  realm:global.config.WAMPREALM
});

const authEvents = new AuthServiceEvents();


connection.onopen = (session)=>{
  console.log('Connected to WAMP router..');
  authEvents.monitorLogins(global.config.POLLDELAY);
  authEvents.monitorPasswordAttempts(global.config.POLLDELAY);
  // authEvents.monitorRegistrations(global.config.POLLDELAY);
  authEvents.on('login',(_event)=>{session.publish('io.outlawdesigns.accounts.loginEvent',[_event]);});
  authEvents.on('badpassword',(_event)=>{console.log(_event);session.publish('io.outlawdesigns.accounts.passwordEvent',[_event]);});
  authEvents.on('newuser',(_event)=>{session.publish('io.outlawdesigns.accounts.registrationEvent',[_event]);});
};

connection.open();
