// server.js
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

app.get("/api/:date", (req, res) => {
    let date = new Date(Date.parse(req.params.date));

    if (date instanceof Date && !isNaN(date)) {
        res.json({unix: date.getTime(), utc: date.toUTCString()});
    } else {
        date = new Date(parseInt(req.params.date));
        
        if (date instanceof Date && !isNaN(date)) {
            res.json({unix: date.getTime(), utc: date.toUTCString()});
        } else {
            res.json({error: "Invalid Date"});
        }
    }
})

app.get("/api/", ((req, res) => {
  const actualDate = new Date();
  res.json({ unix: actualDate.getTime(), utc: actualDate.toUTCString()});
}))

// listen for requests :) // process.env.PORT
var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
