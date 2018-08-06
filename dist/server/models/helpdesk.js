"use strict";
// import * as mongoose from 'mongoose';
Object.defineProperty(exports, "__esModule", { value: true });
// const helpdeskSchema = new mongoose.Schema({
//     category: String,
//     subcategory: String,
//     details: String,
//     chat: String,
//     username: String,
//     user_id: String,
//     usern_name: String,
//     email: String,
//     status: String,
//     role: String
// });
// const Helpdesk = mongoose.model('Helpdesk', helpdeskSchema);
// // export default Helpdesk;
var mongoose = require("mongoose");
var helpdeskSchema = new mongoose.Schema({
    category: String,
    subcategory: String,
    details: String,
    chat: String,
    username: String,
    email: String,
    user_id: String,
    status: String,
    date: Date,
    read: {
        type: Boolean,
        default: 0
    },
    reslove_date: Date
});
var Helpdesk = mongoose.model('Helpdesk', helpdeskSchema);
exports.default = Helpdesk;
//# sourceMappingURL=helpdesk.js.map