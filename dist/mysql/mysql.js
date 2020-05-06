"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.connected = false;
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
    Object.defineProperty(MySQL, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new this();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    MySQL.executeQuery = function (query, callback) {
        this.instance.connection.query(query, function (err, results, fields) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('no existe registro');
            }
            else {
                callback(null, results);
            }
        });
    };
    MySQL.prototype.connectDB = function () {
        var _this = this;
        this.connection.connect(function (err) {
            if (err) {
                console.log(err.message);
            }
            _this.connected = true;
            console.log('database online');
        });
    };
    return MySQL;
}());
exports.default = MySQL;
