"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var catSchema = new mongoose.Schema({
    name: String,
    category_type: String,
});
var Cat = mongoose.model('Cat', catSchema);
exports.default = Cat;
//# sourceMappingURL=cat.js.map