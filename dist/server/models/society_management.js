"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var SocietyManagementSchema = new mongoose.Schema({
    tower_id: String,
    floor_id: String,
    flat_id: String,
    parking_spot_id: String,
});
var SocietyManagement = mongoose.model('SocietyManagement', SocietyManagementSchema);
exports.default = SocietyManagement;
//# sourceMappingURL=society_management.js.map