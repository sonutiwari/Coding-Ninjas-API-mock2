// getting model.
let reportsModel = require('../models/reports.model');

let reportsController = {};

reportsController.getAllReportOfStatus = async (req, res) => {
    let status = req.params.status;
    reportsModel.find({status: status}, (err, resp)=>{
        if (err) {
            return res.send({
                status: 404,
                message: err
            })
        } else {
            return res.send({
                status: 200,
                data: resp
            });
        }
    })
}
module.exports = reportsController;