"use strict";

const Record = require('outlawdesigns.io.noderecord');

class User extends Record{

  constructor(id){
    const database = 'users';
    const table = 'users';
    const primaryKey = 'UID';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'UID',
      'username',
      'password',
      'auth_token',
      'secret',
      'token_expiration',
      'ip_address',
      'mac_address',
      'lat',
      'lon',
      'created_date',
      'created_by',
      'updated_date',
      'updated_by',
      'last_login',
      'status_id',
      'first_name',
      'last_name',
      'dob',
      'street_address',
      'city',
      'state',
      'email',
      'phone',
      'domain',
      'login_attempts',
      'lock_out',
      'lock_out_expiration'
    ];
  }
  static async count(){
    let obj = new User();
    let results = await obj.db.table(obj.table).select('count(*) as total').execute();
    return results[0].total;
  }
  static async lastRecord(){
    let obj = new User();
    let lastId = await obj._getId();
    return new User(lastId[0]['UID'])._build();
  }
}

module.exports = User;
