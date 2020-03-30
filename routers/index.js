// Importing required libraries.
let express   = require('express');
let router    = express.Router();
let doctorRouter = require('./v1/doctors.route');
let patientsRouter = require('./v1/patients.route');
let reportsRouter  = require('./v1/reports.route');

// Routing doctors to it's separate router.
router.use('/doctors/', doctorRouter);

// Routing patients to it's separate router.
router.use('/patients/', patientsRouter);

// Routing register router.
router.use('/register_patient/', patientsRouter);

// reports router.
router.use('/reports/', reportsRouter);


// 404 page for routing that is unavailable.
router.get('/*', (req, res)=>{
    res.status(404).send({
        status : 404,
        message: "Couldn't find the resource you are looking."
    });
});

// Exporting the module.
module.exports = router;
