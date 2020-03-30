// importing needed libraries.
const express       = require('express');
const APIRouter     = express.Router();
const APIController = require('../../controllers/v1/api.controller');

// Setting up routing paths.
APIRouter.get('/:id', APIController.getAllData);
APIRouter.post('/create', APIController.createProduct);

// exporting the module.
module.exports = APIRouter;
