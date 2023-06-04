const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Profile {
        _id: ID
        username: String
        password: String
        entries: [Entry]!
    }

    type Entry {
        _id: ID
        entryTitle: String
        entryContent: String
        entryAuthor: String
        createdAt: String
    }

    # Auth type to handle returning data from a profile creating or user login
    type Auth {
        token: ID!
        profile: Profile
    }

    type Query {
        profiles: [Profile]
        profile(username: String!): Profile
        me: Profile
        entries(username: String): [Entry]
    }

    type Mutation {
        # Mutations to handle creating a profile or logging into a profile and return Auth type
        addProfile(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addEntry(entryTitle: String!, entryContent: String!): Entry
        removeEntry(entryId: ID!): Entry
        editEntry(entryId: ID!, entryTitle: String!, entryContent: String!): Entry
    }
`;

module.exports = typeDefs;