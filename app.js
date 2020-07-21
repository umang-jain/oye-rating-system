var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    methodoverride          = require("method-override"),
    expresssanitizer        = require("express-sanitizer"),
    Driver                  = require("./models/driver"),
    Passenger               = require("./models/passenger"),
    Ride                    = require("./models/ride");

var PORT = process.env.PORT || 3000;

app.use(expresssanitizer());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(methodoverride("_method"));

mongoose.connect("mongodb://admin123:admin123@ds145194.mlab.com:45194/oye-rating-system");

// Testing the connection

app.get("/",function(req,res){
   res.send('Home');
});

// Creating the Driver

app.post("/createDriver",function(req,res){
    Driver.create(req.body,function(err,driver){
        if(err){
            console.log(err);
        }else{
            driver.save();
            res.send(driver);
        }
    });
});

// Creating a Passenger

app.post("/createPassenger",function(req,res){
    Passenger.create(req.body,function(err,passenger){
        if(err){
            console.log(err);
        }else{
            passenger.save();
            res.send(passenger);
        }
    });
});

// When a trip ends

app.post("/endtrip",function(req,res){

    Ride.create(req.body,function(err,ride){
        if(err){
            console.log(err);
        }else{
            ride.save();

            Driver.findById(mongoose.Types.ObjectId(req.body.driverId), (err,driver) => {
                if(err){
                  console.log(err);
                }else{
                    let sumRating = (driver.avgRating) * (driver.rides.length);
                    driver.rides.push(ride);
                    driver.avgRating = (sumRating + req.body.driverRating)/driver.rides.length;
                    driver.save();
                }
            });

            Passenger.findById(mongoose.Types.ObjectId(req.body.passengerId), (err,passenger) => {
                if(err){
                  console.log(err);
                }else{
                    let sumRating = (passenger.avgRating) * (passenger.rides.length);
                    passenger.rides.push(ride);
                    passenger.avgRating = (sumRating + req.body.passengerRating)/passenger.rides.length;
                    passenger.save();
                }
            });
            res.send(ride);
        }
    });
});

// Getting the aggregated rating of Driver

app.post("/driverRating",function(req,res){
    Driver.findById(req.body.driverId, (err,driver) => {
        if(err){
            console.log(err);
        }else{
            res.send({"rating":driver.avgRating});
        }
      });
});

// Getting the aggregated rating of Driver

app.post("/passengerRating",function(req,res){
    Passenger.findById(req.body.passengerId, (err,passenger) => {
        if(err){
            console.log(err);
        }else{
            res.send({"rating":passenger.avgRating});
        }
      });
});


app.listen(PORT,function(req,res){
   console.log("Starting Server on port 3000");
});
