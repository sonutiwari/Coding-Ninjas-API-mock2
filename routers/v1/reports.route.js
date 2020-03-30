let express       = require('express');

// auth
let auth = require('../utilities/auth');

let reportsRouter     = express.Router();
let reportsController = require('../../controllers/reports.controller');
reportsRouter.get('/:status/', auth, reportsController.getAllReportOfStatus);
module.exports = reportsRouter;