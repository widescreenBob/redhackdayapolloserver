import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    "Get tracks array for our learning path landing page"
    tracksForHome: [Track!]!
  }

  type Query {
    "Get hero for learning path landing page"
    hero: HeroContent
  }


  "A learning path is a group of resources that teaches about a specific topic"
  type Track {
    id: ID!
    title: String!
    author: Author!
    "This is a summary of the resource for card presentations"
    summary: String
    "This is the main body of the content"
    body: String
    "Measured in time, presented as a string ie 5minutes"
    length: String
  }

  "Author of a complete learning path or a resource"
  type Author {
    id: ID!
    name: String!
    url: String
  }

  "Hero content for learning path"
  type HeroContent {
    title: String!
    description: String
    cta: CTA
    media: String
    metadata: MetaData
  }

  "A cta for the hero"
  type CTA {
    "The text displayed in the cta"
    text: String
    "Destination of the cta"
    url: String
  }

  "Meta data for the hero"
  type MetaData {
    "Type will likely be 'learning path"
    type: String
    "How many resources are in the list"
    resourceCount: Int
    "How long the path takes, stored as a string"
    time: String
    "Date published, stored as a string"
    publishedDate: String
  }

`;