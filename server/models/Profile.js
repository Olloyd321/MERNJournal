const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },

});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
