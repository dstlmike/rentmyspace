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

  console.log(res);
  res.render('canonical.ejs');
});

app.get('/home', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  console.log(res);
  res.render('home.ejs');
});

app.get('/aimarketing', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  console.log(res);
  res.render('aimarketing.ejs');
});
app.get('/ai.marketing', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  console.log(res);
  res.render('ai.marketing.ejs');
});

app.get('/bot', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  console.log(res);
  res.render('bot.ejs');
});

app.get('/unsubscribe', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  console.log(res);
  res.render('unsubscribe.ejs');
});

app.post('/unsubscribe', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

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

  console.log(res);
 res.render('unsubscribe-ai.ejs');
});



app.get('/support', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  console.log(res);
  res.render('contact.ejs');
});

app.post('/support', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

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

  console.log(res);
 res.render('contact-ai.ejs');
});




app.get('/sitemap.xml', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  console.log(res);
  res.render('sitemap.xml');
});

app.get('/robots.txt', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
  console.log(res);
  res.render('robots.txt');
});



app.get('/test', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
  console.log(res);
  res.render('test.ejs');
});



module.exports = app;
