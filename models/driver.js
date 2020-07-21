var mongoose = require("mongoose");

var driverSchema = new mongoose.Schema({
    name:String,
    age:Number,
    contact:Number,
    licenseNo:String,
    avgRating:Number,
    rides:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Ride"
            }
        ]
});

module.exports=mongoose.model("Driver",driverSchema);
