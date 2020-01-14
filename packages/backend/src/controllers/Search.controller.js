const Dev = require('mongoose').model('Dev');

const parseStringToArray = require('../utils/parseStringToArray');

module.exports = {
    async index(req, res) {
        const { techs, longitude, latitude } = req.query;

        const devs = await Dev.find({
            techs: { $in: parseStringToArray(techs) },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return res.status(200).json(devs);
    },
};
