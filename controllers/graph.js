var GraphApi= require('../api/graph');

var GraphRoute = {

  getReport: (req, res) => {
    var opts = req.body;
    // opts.timeZone = "America/New_York";
    // opts.granularity = "day";
    GraphApi.getReport(opts, function (err, output) {
      if (err) {
        return res.status(407).send({"Error" :  err })
      }
      return res.send(output);
    })
  }
};



module.exports= GraphRoute;