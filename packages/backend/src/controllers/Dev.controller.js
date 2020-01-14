const Dev = require('../models/Dev.model');
const github_api = require('../services/GitHub.service');
const parseStringAsArray = require('../utils/parseStringToArray');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.status(200).json(devs);
    },

    async store(req, res) {
        const { login, techs, longitude, latitude } = req.body;

        const dev = await Dev.findOne({ login });

        if (!dev) {
            const {
                data: { name = login, bio, avatar_url },
            } = await github_api.get(`/users/${login}`);

            const newDev = await Dev.create({
                login,
                name,
                bio,
                avatar_url,
                techs: parseStringAsArray(techs),
                location: { type: 'Point', coordinates: [longitude, latitude] },
            });

            return res.status(201).json(newDev);
        } else return res.status(201).json(dev);
    },

    async update(req, res) {
        const { _id } = req.params;
        const { ghData = false, techs, longitude, latitude } = req.body;

        const currentData = await Dev.findById(_id);

        let { name, bio, avatar_url } = req.body;

        if (
            ghData &&
            (name === undefined ||
                bio === undefined ||
                avatar_url === undefined)
        ) {
            const { data } = await github_api.get(
                `/users/${currentData.login}`
            );

            if (!name) name = data.name;
            if (!bio) bio = data.bio;
            if (!avatar_url) avatar_url = data.avatar_url;
        }

        const dev = await Dev.findByIdAndUpdate(
            _id,
            {
                name: name ? name : currentData.name,
                bio: bio ? bio : currentData.bio,
                avatar_url: avatar_url ? avatar_url : currentData.avatar_url,
                techs: techs ? parseStringAsArray(techs) : currentData.techs,
                location: {
                    type: 'Point',
                    coordinates: [
                        longitude
                            ? longitude
                            : currentData.location.coordinates[0],
                        latitude
                            ? latitude
                            : currentData.location.coordinates[1],
                    ],
                },
            },
            { new: true }
        );

        return res.status(200).json(dev);
    },

    async destroy(req, res) {
        const { _id } = req.params;

        await Dev.findByIdAndDelete(_id);

        return res.status(204).send();
    },
};
