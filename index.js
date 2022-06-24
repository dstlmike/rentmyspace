var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var getIpData = require('./modules/ipdata.js');
var routes = require('./routes/routes.js');
var moment = require('moment');
var date = moment().utcOffset(-240).format('LLLL');
var port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

   app.use(routes);

app.listen(port, function(error) {
  if(error) {
    console.log(error);
  }
  console.log('Server started at ' + date + ' and running on Port: ' + port);
});
