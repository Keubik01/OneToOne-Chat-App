"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var announcementSchema = new mongoose.Schema({
    title: String,
    description: String,
    startdate: Date,
    lastdate: Date,
    floor_lists: String,
    userids: Array
});
var Announcements = mongoose.model('Announcements', announcementSchema);
exports.default = Announcements;
//# sourceMappingURL=announcement.js.map