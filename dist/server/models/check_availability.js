"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var CheckAvailabilitySchema = new mongoose.Schema({
    therapist_id: String,
    date: String,
    slots: []
});
var CheckAvailability = mongoose.model('CheckAvailability', CheckAvailabilitySchema);
exports.default = CheckAvailability;
//# sourceMappingURL=check_availability.js.map