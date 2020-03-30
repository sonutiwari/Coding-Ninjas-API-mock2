// Importing required libraries.
const express   = require('express');
const router    = express.Router();
const APIRouter = require('./v1/index');

// Routing products to it's separate router.
router.use('/products/', APIRouter);

// 404 page for routing that is unavailable.
router.get('/*', (req, res)=>{
    res.send({
        status : 404,
        message: "Couldn't find the resource you are looking."
    });
});

// Exporting the module.
module.exports = router;