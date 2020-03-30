// importing required libraries.
const express    = require('express');
const router     = require('./routers/index');
const db         = require('./config/mongo.config');

// Defining pORT for app to run.
const PORT    = process.env.PORT || 3000;

// Creating app from express library.
const app     = express();

// setting up useful middlewares.
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Setting up router.
app.use('/', router);

// Start server.
app.listen(PORT, (err)=>{
    if (err) console.log('Error in starting app---->', err);
    else console.log('App is running at ------>>>>>', PORT);
})