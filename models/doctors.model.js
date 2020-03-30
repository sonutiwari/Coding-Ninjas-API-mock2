// import mongoose library.
let mongoose = require('mongoose');

// jwt.
let jwt = require('jsonwebtoken');

// bcrypt.
let bcrypt = require('bcrypt');

// get schema.
let Schema = mongoose.Schema;

// Create doctors schema.
let doctorsSchema = new Schema({
    username : {type: String, unique: true, required: true },
    password : {type: String, unique: true, required: true },
    tokens   : [{token: {type: String, required: true }}]
}
,{timestamps: true}
);

doctorsSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

doctorsSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, "Sonu Tiwari");
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token
}

doctorsSchema.statics.findByCredentials = async (username, password) => {
    // Search for a user by email and password.
    const user = await doctorsModel.findOne({ username} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user;
}

// create model.
let doctorsModel = mongoose.model('Doctors', doctorsSchema);

// export module.
module.exports = doctorsModel;
