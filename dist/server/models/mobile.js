"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mobileSchema = new mongoose.Schema({
    user_id: String,
    email: String,
    username: String,
    token: String,
    device_id: String,
    device_type: String,
    push_token: String,
    current_timestamp: Date
});
var Mobile = mongoose.model('Mobile', mobileSchema);
exports.default = Mobile;
//# sourceMappingURL=mobile.js.map