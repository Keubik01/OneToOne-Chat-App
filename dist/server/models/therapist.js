"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var TherapistSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    off_day: String,
    time: String
});
var Therapists = mongoose.model('Therapists', TherapistSchema);
exports.default = Therapists;
//# sourceMappingURL=therapist.js.map