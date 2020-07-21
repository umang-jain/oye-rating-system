var mongoose = require("mongoose");

var rideSchema = new mongoose.Schema({
    startLocation:String,
    endLocation:String,
    passengerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Passenger"
    },
    driverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    },
    driverRating:Number,
    passengerRating:Number
});

module.exports = mongoose.model("Ride",rideSchema);