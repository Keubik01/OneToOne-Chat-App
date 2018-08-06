"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var BookMassageSchema = new mongoose.Schema({
    user_id: String,
    therapist_id: String,
    massage_type: String,
    booking_date: String,
    start_time: String,
    end_time: String,
    deleted: {
        type: Boolean,
        default: false
    }
});
var BookMassage = mongoose.model('BookMassage', BookMassageSchema);
exports.default = BookMassage;
//# sourceMappingURL=book_massage.js.map