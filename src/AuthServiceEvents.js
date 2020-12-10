"use strict";
const EventEmitter = require('events').EventEmitter;
const UserLocation = require('./models/UserLocation');
const PasswordAttempt = require('./models/PasswordAttempt');
const User = require('./models/User');

class AuthServiceEvents extends EventEmitter{
  constructor(){
    super();
    this.userLocationCount = 0;
    this.passwordAttemptCount = 0;
    this.userCount = 0;
    this.loginInterval = null;
    this.passwordInterval = null;
    this.registrationInterval = null;
  }
  async _getLastLogin(){
    let last = await UserLocation.lastRecord();
    return last
  }
  async _getLastPassAttempt(){
    let last = await PasswordAttempt.lastRecord();
    return last;
  }
  async _getLastUser(){
    let last = await User.lastRecord();
    return last;
  }
  async _loginInterval(){
    let currentCount = await UserLocation.count();
    if(currentCount != this.userLocationCount){
      this.userLocationCount = currentCount;
      let lastLogin = await this._getLastLogin();
      this.emit('login',lastLogin._buildPublicObj());
    }
  }
  async _passwordInterval(){
    let currentCount = await PasswordAttempt.count();
    if(currentCount != this.passwordAttemptCount){
      this.passwordAttemptCount = currentCount;
      let last = await this._getLastPassAttempt();
      this.emit('badpassword',last._buildPublicObj());
    }
  }
  async _registrationInterval(){
    let currentCount = User.count();
    if(currentCount != this.userCount){
      this.userCount = currentCount;
      let last = await this._getLastUser();
      this.emit('newuser',last._buildPublicObj());
    }
  }
  generateEvent(){
    this.emit('test','The result of a test event');
  }
  stopMonitor(monitorType){
    switch(monitorType){
      case 'login':
        clearInterval(this.loginInterval);
      break;
      case 'password':
        clearInterval(this.passwordInterval);
      break;
      case 'registration':
        clearInterval(this.registrationInterval);
      break;
      default:
        throw new Error('Invalid monitorType');

    }
  }
  async monitorLogins(intervalMs){
    this.userLocationCount = await UserLocation.count();
    this.interval = setInterval(()=>{this._loginInterval()},intervalMs);
  }
  async monitorPasswordAttempts(intervalMs){
    this.passwordAttemptCount = await PasswordAttempt.count();
    this.passwordInterval = setInterval(()=>{this._passwordInterval()},intervalMs);
  }
  async monitorRegistrations(intervalMs){
    this.userCount = await User.count();
    this.registrationInterval = setInterval(()=>{this._registrationInterval()},intervalMs);
  }
}

module.exports = AuthServiceEvents;
