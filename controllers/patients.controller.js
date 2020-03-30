//  get patient model.
let patientModel = require('../models/patients.model');

// get reports model.
let reportsModel = require('../models/reports.model');

// define controller object.
let patientController = {};

patientController.register = async (req, res)=>{
    let mobile = req.body.mobile;
    let patient = await patientModel.findOne({mobile: mobile});
    if (!patient){
        patient = new patientModel(req.body);
        patient = await patient.save();
        if (patient) {
            res.send({status: 200, message: "Patient Created successfully"});
            return;
        } else {
            res.send({status: 400, message: "database error"});
            return;
        }
    } else {
        res.send({status: 200, message: "User is already registered"});
        return;
    }
}
// Get All Data Method.
patientController.createReport = async (req, res)=>{
    let id = req.params.id;
    let enmuArray = ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"];
    let item = enmuArray[Math.floor(Math.random() * enmuArray.length)];
    let doctor_id = req.session.doctor_id;
    let report = new reportsModel({
        patient_id: id,
        status    : item,
        doctor_id : doctor_id
    });
    report.save((err, resp) => {
        if (err) {
            return res.send({
                status: 400,
                message: "DB error" + err
            });
        }
        return res.send({
            status: 200,
            message: "Report saved"
        });
    })
    
}

// Get All Data Method.
patientController.allReports = async (req, res)=>{
    let id = req.params.id;
    let ans = await reportsModel.find({patient_id: id}).sort([["createdAt", -1]]).exec();
    if (ans) {
        return res.send({
            status: 200,
            message: ans
        });
    } else {
        return res.send({
            status: 200,
            message: "DB error"
        });
    }
}
// export module.
module.exports = patientController;
