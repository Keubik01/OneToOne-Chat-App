"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var staffSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    staff_type: String,
    firstname: String,
    lastname: String,
    address: String,
    contact_no: Number,
    alternate_contact_no: Number,
    status: String
});
var Staffs = mongoose.model('Staffs', staffSchema);
exports.default = Staffs;
//# sourceMappingURL=staff.js.map