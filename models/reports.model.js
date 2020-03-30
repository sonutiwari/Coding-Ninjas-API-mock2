// Get doctors schema.
let doctorsSchema = require('./doctors.model');

// Get Patients Schema.
let patientsSchema = require('./patients.model');

// Import mongoose library.
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reportSchema = new Schema({
    patient_id: {type: Schema.Types.ObjectId, ref: patientsSchema},
    doctor_id : {type: Schema.Types.ObjectId, ref: doctorsSchema},
    status    : {type: String, enum:["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"]},
}, {timestamps: true});

// Create model.
let reportsModel = mongoose.model('Reports', reportSchema);

// Export module.
module.exports = reportsModel;
