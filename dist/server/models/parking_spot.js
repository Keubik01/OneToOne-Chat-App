"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ParkingSpotSchema = new mongoose.Schema({
    tower_id: String,
    floor_id: String,
    flat_id: String,
    parking_spot_name: String,
    parking_spot_id: String,
});
var ParkingSpot = mongoose.model('parking_spot', ParkingSpotSchema);
exports.default = ParkingSpot;
//# sourceMappingURL=parking_spot.js.map