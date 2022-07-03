var mongoose = require('mongoose');
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/marketbotai?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
var commands;
var getIpData = require('../modules/ipdata.js');
var moment = require('moment');
var axios = require('axios');
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var { timee } = moment().utcOffset(-240).format('LTS');
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var db_table = year;
var db_table2 = year + "-" + "returning";
var db_table3 = year + "-" + month;
var db_table4 = year + "-crawlers";
var dbt = mongoose.connection;

mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });

  var getAllDocuments = async function(ipp, reqUrl) {
  var ipdata = await getIpData(ipp);
  var { is_ip } = ipdata;
  var date = moment().utcOffset(-240).format('LL');
  var datee = moment().utcOffset(-240).format('MM-DD');
  var time = moment().utcOffset(-240).format('LTS');
  var timee = moment().utcOffset(-240).format('HH:mm');
  var year = moment().utcOffset(-240).format('YYYY');
  var month = moment().utcOffset(-240).format('MM');
  var day = moment().utcOffset(-240).format('DD');
  var matchHash = { ip: ipp, reqUrl: reqUrl, date: date, time: time, info: ipdata};
  var repeat = { date, "ip": ipp, time, reqUrl };
  var info = ipdata;
  reqUrl = reqUrl;
  date = date;
  var ipp = ipp;

dbt.collection(db_table).find({"ip": ipp}).toArray(function(err, docs) {
if (err) {
return console.log(err);
}

if (docs < 1) {
  dbt.collection(db_table).insertOne(matchHash, (err, result) => {
  if (err) {
  return console.log(err);
}
  });
} else if(docs && (matchHash.info.asn.domain == "about.google" || matchHash.info.asn.domain == "amazon.com" || matchHash.info.asn.domain == "cloudflare.com" || matchHash.info.asn.domain == "yandex.com" || matchHash.info.asn.domain == "microsoft.com")) {
 //if(matchHash.info.asn.domain == "about.google" || matchHash.info.asn.domain == "amazon.com" || matchHash.info.asn.domain == "cloudflare.com" || matchHash.info.asn.domain == "yandex.com" || matchHash.info.asn.domain == "microsoft.com") {
dbt.collection(db_table4).find({"ip": ipp}).toArray(function(err, docs) {
  if (err) {
  return console.log(err);
}
  if (docs < 1) {
    dbt.collection(db_table4).insertOne(matchHash, (err, result) => {
    if (err) {
    return console.log(err);
}
});
} else if(docs (matchHash.info.asn.domain != "about.google" || matchHash.info.asn.domain != "amazon.com" || matchHash.info.asn.domain != "cloudflare.com" || matchHash.info.asn.domain != "yandex.com" || matchHash.info.asn.domain != "microsoft.com")) {
dbt.collection(db_table4).updateOne( {"ip": ipp}, {$push: {[datee]: {[timee]: date, "ip": ipp, time, reqUrl}}}, (err, result) => {
  if (err) {
  return console.log(err);
  }
});
} else {
dbt.collection(db_table2).find({"ip": ipp}).toArray(function(err, docs) {
  if (err) {
  return console.log(err);
}
  if (docs < 1) {
    dbt.collection(db_table2).insertOne(matchHash, (err, result) => {
    if (err) {
    return console.log(err);
  }
});
  } else if(docs) {
  dbt.collection(db_table3).find({"ip": ipp}).toArray(function(err, docs) {
    if (err) {
    return console.log(err);
}
    if (docs < 1) {
      dbt.collection(db_table3).insertOne(matchHash, (err, result) => {
      if (err) {
      return console.log(err);
    }
  });
} else if(docs) {
  dbt.collection(db_table3).updateOne( {"ip": ipp}, {$push: {[datee]: {[timee]: date, "ip": ipp, time, reqUrl}}}, (err, result) => {
  if (err) {
  return console.log(err);
  }
});
}
});
}
});
 }

});
}
});
}

module.exports = getAllDocuments;
