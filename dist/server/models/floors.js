"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var FloorsSchema = new mongoose.Schema({
    tower_id: String,
    floor_id: String,
    floor_name: String,
});
var Floor = mongoose.model('Floor', FloorsSchema);
exports.default = Floor;
//# sourceMappingURL=floors.js.map