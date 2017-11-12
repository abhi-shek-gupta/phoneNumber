const express = require('express');
http = require('http');
const morgan = require('morgan');
var PhoneNumber = require( 'awesome-phonenumber' );

const hostname = 'localhost';
const port = 3000;
const app = express();

app.use(morgan('dev'));

app.get('/country/:phoneNumber', function(req, res){
    var pn = new PhoneNumber(req.params.phoneNumber);
    if(pn.a.valid){
         var countryCode="+"+PhoneNumber.getCountryCodeForRegionCode(pn.a.regionCode);
         console.log("country code is : +"+countryCode);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({"country":countryCode}) 
    }
    else{
        res.statusCode = 400;
        console.log("Invalid formate");
        res.json({"errorMessage":"Invalid phone number"})
    }
    
  });

//for serving static pages
app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("connected to server");
    
    });

const server = http.createServer(app);

server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});