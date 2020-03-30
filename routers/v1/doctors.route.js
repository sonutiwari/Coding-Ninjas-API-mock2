// importing needed libraries.
const express       = require('express');
const doctorsRouter     = express.Router();
const doctorsController = require('../../controllers/doctors.controller');

// Setting up routing paths.
doctorsRouter.post('/login', doctorsController.login);
doctorsRouter.post('/register', doctorsController.register);

// exporting the module.
module.exports = doctorsRouter;
