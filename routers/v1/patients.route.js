// importing needed libraries.
let express       = require('express');
let patientRouter     = express.Router();
let patientController = require('../../controllers/patients.controller');
let auth = require('../../utilities/auth');

// Setting up routing paths.
patientRouter.get('/:id/create_report', auth, patientController.createReport);

// Setting up routing paths.
patientRouter.get('/:id/all_reports', auth, patientController.allReports);

// Setting register path.
patientRouter.post('/', auth,  patientController.register);

// exporting the module.
module.exports = patientRouter;
