const { Profile } = require('../models');

const resolvers = {
    Query: {
        profiles: async () => {
            return await Profile.find({});
        }
    },
    Mutation: {
        addProfile: async (parent, { username, password }) => {
            return await Profile.create({ username, password });
        }
    }
};

module.exports = resolvers;