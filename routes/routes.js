var express = require('express');
var router = express.Router();
var app = express();
var routes = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var ejs = require('ejs');
var path = require('path');
var nodemailer = require('nodemailer');
var moment = require('moment');
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var getIpData = require('../modules/ipdata.js');
var getAllDocuments = require('../modules/dbfunctions.js');
var GMAIL_USER = process.env.GMAIL_USER;
var GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
app.set('trust proxy', true);
app.use(express.static('partials'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
//var ippp = req.socket.remoteAddress
  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ippp.split(',')[0].trim();
  var ipdata = await getIpData(ipp);
   var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;
  /* var blackList = ['8'];
   if(blackList.indexOf(ipp) > -1) {
       if (domain != 'about.google' || domain != 'yandex.com' || domain != 'microsoft.com' || domain != 'godaddy.com' || domain != 'amazon.com' || domain != 'amazon.ca') {
      var ipdataa = date + ' ' + time + '\n' + ipp + '\n' + 'Blocked Threat! \n Secret Page.' + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + 'ip: ' + ipp + '\n' + 'City: ' + city + '\n' + 'Country: ' + country_name + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + '\n' + 'is_known_attacker: ' + is_known_attacker + '\n' + 'is_known_abuser: ' + is_known_abuser + '\n' + 'is_anonymous: ' + is_anonymous + '\n' + '}';

    var domain = ipdata.asn.domain;

    var ip = ipdata.ip;

    var city = ipdata.city;

    var country_name = ipdata.country_name;

    var postal = ipdata.postal;
      console.log(ipdataa);

    res.status(403).end('You found the secret page, tell me more so I can find this page too.');

    return;
   }
   }*/
   /*
  if (is_threat || is_known_abuser || is_known_attacker) {
    if (domain != 'about.google' || domain != 'yandex.com' || domain != 'microsoft.com' || domain != 'godaddy.com' || domain != 'amazon.com' || domain != 'amazon.ca') {
    var ipdataa = date + ' ' + time + '\n' + ipp + '\n' + 'Blocked Threat!' + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + 'ip: ' + ipp + '\n' + 'City: ' + city + '\n' + 'Country: ' + country_name + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + '\n' + 'is_known_attacker: ' + is_known_attacker + '\n' + 'is_known_abuser: ' + is_known_abuser + '\n' + 'is_anonymous: ' + is_anonymous + '\n' + '}';
    var domain = ipdata.asn.domain;
    var ip = ipdata.ip;
    var city = ipdata.city;
    var country_name = ipdata.country_name;
    var postal = ipdata.postal;
    console.log(ipdataa);
    res.status(403).end();
    return;
  }
  }
*/
  if (is_anonymous) {
    var ipdataa = date + ' ' + time + '\n' + ipp + '\n' + 'VPNs are not allowed' + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + 'ip: ' + ipp + '\n' + 'City: ' + city + '\n' + 'Country: ' + country_name + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + '\n' + 'is_known_attacker: ' + is_known_attacker + '\n' + 'is_known_abuser: ' + is_known_abuser + '\n' + 'is_anonymous: ' + is_anonymous + '\n' + '}';
    var domain = ipdata.asn.domain;
    var ip = ipdata.ip;
    var city = ipdata.city;
    var country_name = ipdata.country_name;
    var postal = ipdata.postal;
    console.log(ipdataa);
    res.status(403).end('VPNs are not allowed.');
    return;
  }

  if (process.env.NODE_ENV != 'development') {
  if (!req.secure || req.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com') {
  return res.status(301).redirect('https://marketbotai.com');
  }
}
  next();
  });

app.get('/', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
//var ippp = req.socket.remoteAddress
  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';

  console.log(logg);
  res.render('canonical.ejs');
});

app.get('/home', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
  res.render('home.ejs');
});

app.get('/aimarketing', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
  res.render('aimarketing.ejs');
});
app.get('/ai.marketing', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
  res.render('ai.marketing.ejs');
});

app.get('/bot', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
  res.render('bot.ejs');
});

app.get('/unsubscribe', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
  res.render('unsubscribe.ejs');
});

app.post('/unsubscribe', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);

var Transport = nodemailer.createTransport({


service: 'gmail',
auth: {
user: GMAIL_USER,
pass: GMAIL_PASSWORD
}
});


var to = "alexdeabot@gmail.com";
var subject = "Unsubscribe Request";
var name = req.body.name;
var email = req.body.email;
var reason = req.body.reason;
var text = "Name\n" + name + "\nEmail\n" + email + "\nReason for leaving\n" + reason; //" " + email + " " + reason;


var mailOptions = {


to: to,
from: 'alexdeabot@gmail.com',
subject: subject,
generateTextFromHTML: true,
text: text
};


Transport.sendMail(mailOptions, function(error, response) { 
if (error) { // throw error; //{
console.log(error);
//var msg = "There was an error sending email.";
//callback(true, msg, []);
//return msg;
}
console.log(response);
console.log(name + '\n' + email + '\n' + reason);

Transport.close();
});


var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
 res.render('unsubscribe-ai.ejs');
});



app.get('/contact-us', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
  res.render('contact.ejs');
});

app.post('/contact-us', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);

var Transport = nodemailer.createTransport({


service: 'gmail',
auth: {
user: GMAIL_USER,
pass: GMAIL_PASSWORD
}
});


var to = "alexdeabot@gmail.com";
var subject = "Question Request";
var name = req.body.name;
var email = req.body.email;
var reason = req.body.reason;
var text = "Name\n" + name + "\nEmail\n" + email + "\nQuestion\n" + reason; //" " + email + " " + reason;


var mailOptions = {


to: to,
from: 'alexdeabot@gmail.com',
subject: subject,
generateTextFromHTML: true,
text: text
};


Transport.sendMail(mailOptions, function(error, response) { 
if (error) { // throw error; //{
console.log(error);
//var msg = "There was an error sending email.";
//callback(true, msg, []);
//return msg;
}
console.log(response);
console.log('Question Alert!!\n' + name + '\n' + email + '\n' + reason);

Transport.close();
});


var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
 res.render('canonical.ejs');
});




app.get('/sitemap.xml', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
  res.render('sitemap.xml');
});

app.get('/robots.txt', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
  res.render('robots.txt');
});

module.exports = app;

