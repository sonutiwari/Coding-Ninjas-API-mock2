// get doctors model.
let doctorsModel = require('../models/doctors.model');

// define controller object.
let doctorsController = {};

// doctors login Method.
doctorsController.login = async (req, res)=>{
    try {
        const { username, password } = req.body;
        console.log("login", username, password);
        const user = await doctorsModel.findByCredentials(username, password);
        console.log("login", user);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        console.log("Login", token);
        req.session.jwt_token = token;
        req.session.doctor_id = user._id;
        console.log("Doctor ID", user._id);
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

// register a doctor.
doctorsController.register = async (req, res)=>{
    console.log(req.body);
    let document = new doctorsModel(req.body);
    await document.save((err, resp)=>{
        if (err) {
            return res.status(402).send({
                status: 402,
                message: err
            });
        } else {
            let token = document.generateAuthToken();
            console.log("Token", token);
            return res.status(200).send({
                status: 200,
                message: "data saved successfully",
                token: token
            });
        }
    })
}
// export module.
module.exports = doctorsController;
