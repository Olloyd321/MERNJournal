const { Profile } = require('../models');
const Entry = require('../models/Entry');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        profiles: async () => {
            return await Profile.find({});
        },
        me: async (parent, args, context) => {
            if (context.profile) {
              return Profile.findOne({ _id: context.profile._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },
    Mutation: {
        addProfile: async (parent, { username, password }) => {
            const profile = await Profile.create({ username, password });
            const token = signToken(profile);
            return { token, profile };
          },
        login: async (parent, { username, password }) => {
            const profile = await Profile.findOne({ username });
      
            if (!profile) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await profile.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(profile);
      
            return { token, profile };
        },
        addEntry: async (parent, { entryTitle, entryContent }, context) => {
          if (context.profile) {
            const entry = await Entry.create({
              entryTitle,
              entryContent,
              entryAuthor: context.profile.username,
            });
    
            await Entry.findOneAndUpdate(
              { _id: context.profile._id },
              { $addToSet: { entries: entry._id } }
            );
    
            return entry;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;