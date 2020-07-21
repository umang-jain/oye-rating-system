var mongoose = require("mongoose");

var passengerSchema = new mongoose.Schema({
    name:String,
    age:Number,
    contact:Number,
    avgRating:Number,
    rides:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref: "Ride"
      }
    ]
});

module.exports = mongoose.model("Passenger",passengerSchema);
