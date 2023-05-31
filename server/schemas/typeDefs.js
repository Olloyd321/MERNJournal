const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Profile {
        _id: ID
        username: String
        password: String
    }

    type Query {
        profiles: [Profile]
    }

    type Mutation {
        addProfile(username: String!, password: String!): Profile
    }
`;

module.exports = typeDefs;