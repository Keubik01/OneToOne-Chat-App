"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var maintenanceSchema = new mongoose.Schema({
    category_type: String,
    category_id: String,
    subcategory: String,
    username: String,
    contactno: String,
});
var Maintenance = mongoose.model('Maintenance', maintenanceSchema);
exports.default = Maintenance;
//# sourceMappingURL=maintenance.js.map