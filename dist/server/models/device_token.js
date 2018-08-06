"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserDeviceTokenSchema = new mongoose.Schema({
    user_id: String,
    device_id: String
});
var UserDeviceToken = mongoose.model('UserDeviceToken', UserDeviceTokenSchema);
exports.default = UserDeviceToken;
//# sourceMappingURL=device_token.js.map