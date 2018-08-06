"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var TowersSchema = new mongoose.Schema({
    tower_name: String
});
var Tower = mongoose.model('Towers', TowersSchema);
exports.default = Tower;
//# sourceMappingURL=towers.js.map