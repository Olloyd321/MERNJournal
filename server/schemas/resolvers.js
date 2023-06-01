const { Profile, Entry } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find({});
        },
        profile: async (parent, { username }) => {
            return Profile.findOne({ username: username }).populate('entries');
        },
        me: async (parent, args, context) => {
            if (context.profile) {
              return Profile.findOne({ _id: context.profile._id }).populate('entries');
            }
            throw new AuthenticationError('You need to be logged in!');
          },
        entries: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Entry.find(params).sort({ createdAt: -1 });
        }
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
    
            await Profile.findOneAndUpdate(
              { _id: context.profile._id },
              { $addToSet: { entries: entry } }
            );
    
            return entry;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;