const mongoose = require('mongoose');

const { Schema } = mongoose;
const PointSchema = require('./utils/PointSchema');

const DevSchema = new Schema({
    name: String,
    login: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
});

module.exports = mongoose.model('Dev', DevSchema);
