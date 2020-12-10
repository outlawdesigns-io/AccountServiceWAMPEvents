"use strict";

const Record = require('outlawdesigns.io.noderecord');

class PasswordAttempt extends Record{

  constructor(id){
    const database = 'users';
    const table = 'PasswordAttempt';
    const primaryKey = 'UID';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'UID',
      'userId',
      'password',
      'created_date'
    ];
  }
  static async count(){
    let obj = new PasswordAttempt();
    let results = await obj.db.table(obj.table).select('count(*) as total').execute();
    return results[0].total;
  }
  static async lastRecord(){
    let obj = new PasswordAttempt();
    let lastId = await obj._getId();
    return new PasswordAttempt(lastId[0]['UID'])._build();
  }
}

module.exports = PasswordAttempt;
