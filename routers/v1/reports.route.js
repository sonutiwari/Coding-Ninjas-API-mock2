let express       = require('express');
let reportsRouter     = express.Router();
let reportsController = require('../../controllers/reports.controller');
reportsRouter.get('/:status/', reportsController.getAllReportOfStatus);
module.exports = reportsRouter;