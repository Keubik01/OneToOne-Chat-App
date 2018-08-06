"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var residentSchema = new mongoose.Schema({
    user_id: String,
    // ownername: String,
    firstname: String,
    lastname: String,
    username: String,
    mobile: Number,
    rented_address: String,
    email: String,
    resident_type: String,
    flatnumber: String,
    floor: String,
    tower: String,
    address: String,
    owner_mobile: Number,
    owner_landline: String,
    owner_email: String,
    tenantname: String,
    alt_addof_tenant: String,
    tenant_mobile: Number,
    tenant_email: String
});
var Residents = mongoose.model('Residents', residentSchema);
exports.default = Residents;
//# sourceMappingURL=resident.js.map