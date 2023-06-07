import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query Profiles
   {
    profiles {
      _id
      username
      entries {
        _id
        createdAt
        entryAuthor
        entryContent
        entryTitle
      }
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query Profile($profileUsername: String!) {
    profile(username: $profileUsername) {
      _id
      username
      entries {
        _id
        createdAt
        entryAuthor
        entryContent
        entryTitle
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        entries
    }
  }
`;
