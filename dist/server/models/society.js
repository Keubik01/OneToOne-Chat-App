"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var societySchema = new mongoose.Schema({
    // resident_id: String,
    category_type: String,
    user_id: String,
    startdate: String,
    lastdate: String,
    status: String,
    category_id: String
});
var Societies = mongoose.model('Societies', societySchema);
exports.default = Societies;
//# sourceMappingURL=society.js.map