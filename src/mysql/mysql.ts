import mysql = require('mysql');

export default class MySQL {

  private static _instance: MySQL;

  connection: mysql.Connection;
  connected = false;

  constructor() {
    console.log('class initialized');

    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'node_user',
      password: '123456',
      database: 'node_db'
    });

    this.connectDB();

    // this.connection.connectDB();
  }

  public static get instance() {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }

  static executeQuery(query: string, callback: Function) {
    this.instance.connection.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log(err);
        return callback(err);
      }

      if (results.length === 0) {
        callback('no existe registro');
      } else {
        callback(null, results);
      }
    });
  }

  private connectDB() {
    this.connection.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
      }

      this.connected = true;
      console.log('database online');
    });
  }

}