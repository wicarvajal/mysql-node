"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var router = express_1.Router();
router.get('/heros', function (req, res) {
    var query = "\n    SELECT *\n    FROM heros\n  ";
    mysql_1.default.executeQuery(query, function (err, heros) {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }
        else {
            res.json({
                ok: true,
                heros: heros
            });
        }
    });
});
router.get('/heros/:id', function (req, res) {
    var id = req.params.id;
    var escapeId = mysql_1.default.instance.connection.escape(id);
    var query = "\n    SELECT *\n    FROM heros\n    where id = " + escapeId + "\n  ";
    mysql_1.default.executeQuery(query, function (err, hero) {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }
        else {
            res.json({
                ok: true,
                hero: hero
            });
        }
    });
});
exports.default = router;
