const jwt = require('jsonwebtoken')
const User = require('../models/doctors.model');

const auth = async(req, res, next) => {
    const token = req.session.jwt_token;
    console.log(token);
    try {
        const data = jwt.verify(token, "Sonu Tiwari");
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth
