"use strict";

const Record = require('outlawdesigns.io.noderecord');

class UserLocation extends Record{

  constructor(id){
    const database = 'users';
    const table = 'user_locations';
    const primaryKey = 'UID';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'UID',
      'user',
      'ip',
      'lat',
      'lon',
      'mac',
      'created_date'
    ];
  }
  static async count(){
    let obj = new UserLocation();
    let results = await obj.db.table(obj.table).select('count(*) as total').execute();
    return results[0].total;
  }
  static async lastRecord(){
    let obj = new UserLocation();
    let lastId = await obj._getId();
    return new UserLocation(lastId[0]['UID'])._build();
  }
}

module.exports = UserLocation;
