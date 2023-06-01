const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Profile {
        _id: ID
        username: String
        password: String
    }

    # Auth type to handle returning data from a profile creating or user login
    type Auth {
        token: ID!
        profile: Profile
    }

    type Query {
        profiles: [Profile]
        me: Profile
    }

    type Mutation {
        # Mutations to handle creating a profile or logging into a profile and return Auth type
        addProfile(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;