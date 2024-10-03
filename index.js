// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// timestamp API
app.get('/api/:date?', (req, res) => {
  const date_string = req.params.date;
  
  // if parameter doesn't exist
  if (date_string === undefined) {
    const nowDate = new Date();
    res.json({
      "unix": nowDate.getTime(),
      "utc": nowDate.toUTCString()
    });

  }

  // if parameter exists
  // non-number input
  if (isNaN(date_string)) {

    // invalid date
    if (new Date(date_string) == "Invalid Date") {
      res.json({
        "error" : "Invalid Date"
      });

    // valid date
    } else {
      res.json({
        "unix": Date.parse(date_string),
        "utc": new Date(date_string).toUTCString()
      });

    }
    
  // number input
  } else {
    res.json({
      "unix": Number(date_string),
      "utc": new Date(Number(date_string)).toUTCString()
    });

  }

});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
