import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query Profile
   {
    profiles {
      _id
      username
      enteries
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
        _id
        username
        enteries
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        enteries
    }
  }
`;
