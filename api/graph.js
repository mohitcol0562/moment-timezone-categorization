var parser= require('csv-parser');
var moment  = require('moment-timezone')
var fs= require('fs');
var Utils = require('../utils/commonsFunctions');
var Lodash= require('lodash');

const path= __dirname + "/data.csv";

var GraphApi = {

  getReport: function(opts , cb){
    var results = [];
    fs.createReadStream(path)
    .pipe(parser())
    .on('error' , (error)=>{
        return cb(error);
      })
      .on('data', (data) => opts.timeZone ? results.push({...data, createdAt: moment.tz(data.createdAt , opts.timeZone.toString())}) : results.push(data))
      .on('end',  () => {
        var filterResults = filterByGranularity(opts.timeZone , results , opts.granularity);
        return cb(null , filterResults);
      });
  }
}

function filterByGranularity(timeZone , data , granularity){
  var groupedData = Utils.getArrayMapOnParam(data);
  if(Object.keys(groupedData).length>0){
    Object.keys(groupedData).forEach(category=>{
      groupedData[category] =  granularity && groupedData[category].length>0 ?  granularity=="day" ? Lodash.groupBy(groupedData[category] , filterByDay()) : Lodash.groupBy(groupedData[category] , filterByHours()) : groupedData[category];
    })
  }
  return groupedData;
}

function filterByDay(){
  var byDay = (dataObject)=> moment(dataObject.createdAt).format('DD-MM-YYYY')
  return byDay;
}

function filterByHours(){
  var byHour = (dataObject)=> moment(dataObject.createdAt).format('DD-MM-YYYY') + ' ' + moment(dataObject.createdAt).format('hh a');
  return byHour;
}

module.exports = GraphApi;