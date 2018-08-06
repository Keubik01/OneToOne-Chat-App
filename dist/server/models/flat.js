"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var FlatsSchema = new mongoose.Schema({
    tower_id: String,
    floor_id: String,
    flat_name: String,
    flat_id: String,
});
var Flats = mongoose.model('Flats', FlatsSchema);
exports.default = Flats;
//# sourceMappingURL=flat.js.map