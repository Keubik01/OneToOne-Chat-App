"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var categorytypeSchema = new mongoose.Schema({
    category_type: String
});
var Categorytype = mongoose.model('categorytypes', categorytypeSchema);
exports.default = Categorytype;
//# sourceMappingURL=category_type.js.map