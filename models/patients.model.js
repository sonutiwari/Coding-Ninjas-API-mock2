// import mongoose library.
let mongoose = require('mongoose');

// get schema.
let Schema = mongoose.Schema;

// Create doctors schema.
let patientsSchema = new Schema({
    mobile : {type: Number, unique: true, minlength: 10, maxlength: 10}
}
,{timestamps: true}
);

// create model.
let patientsModel = mongoose.model('Patients', patientsSchema);

// export module.
module.exports = patientsModel;
