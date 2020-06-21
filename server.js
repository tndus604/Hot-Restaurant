// Dependencies
// ===========================================================

var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// page requests
app.use(express.static('public'))

//==========================================
//making tables array and waitinglist array

const tables = [];

const waitinglist = [];


//===================GET REQUEST=====================
//API get request

app.get("/api/tables", function(req, res) {
  // show active tables
  res.json(tables);
});

app.get("/api/waitlist", function(req, res){
  res.json(waitinglist)
}); 


// HTML get request (when users "visits" a page)

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
})

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/reserve.html"))
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/home.html"));
});

//===================POST REQUEST====================

app.post("/api/tables", function(req, res){
  if (tables.length < 5) {
    tables.push(req.body);
    res.json(true);
  } else {
    waitinglist.push(req.body);
    res.json(false);
  }
});

app.post("/api/clear", function(req, res) {
  tables.length = 0;
  waitinglist.length = 0;

  res.json({ok: true});
})


app.post( "/api/reserve", function( req, res ){
  // req.body
  const newReservation = req.body

  res.send( { status: true, message: `Cool beans, we save it for you` } )
})


// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


