"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var subcatSchema = new mongoose.Schema({
    category_type: String,
    category_id: String,
    subcategoryname: String
});
var Subcat = mongoose.model('Subcat', subcatSchema);
exports.default = Subcat;
//# sourceMappingURL=subcat.js.map