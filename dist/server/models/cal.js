"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var calSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date
});
var Cal = mongoose.model('Cal', calSchema);
exports.default = Cal;
//# sourceMappingURL=cal.js.map