"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var chatSchema = new mongoose.Schema({
    user_id: String,
    chat: [{
            admin_id: String,
            from_user: String,
            from_admin: String,
            date: { type: Date, default: Date.now }
        }]
});
var Chat = mongoose.model('Chat', chatSchema);
exports.default = Chat;
//# sourceMappingURL=chat.js.map