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

  type Query {
    "Get hero for learning path landing page"
    social: SocialShare
  }

  type Query {
    card: CardPreso
  }

  type Query {
    topics: Topics
  }

  "A learning path is a group of resources that teaches about a specific topic"
  type Track {
    learningResourceId: ID!
    learningResourcePosition: Int
    learningResourceAlternativeHeading: String
    learningResourceIntroduction: String
    learningResourceEducationalLevel: String
    "Measured in time, presented as a string ie 5minutes"
    learningResourceTimeToComplete: String
    author: Authors
  }

  "Author of a complete learning path or a resource"
  type Authors {
    authorName: String!
    authorUrl: String
  }

  "Hero content for learning path"
  type HeroContent {
    heroHeading: String!
    heroDescription: String
    body: String
    metadata: MetaData
    topics: Topics
  }

  "Social Share Info"
  type SocialShare {
    shareImageUrl: String
    shareImageAlt: String
  }

  "Information for card presentation of LP"
  type CardPreso {
    featureImageUrl: String
    featureImageAlt: String
    description: String
    body: String
    metadata: MetaData
  }

  "Meta data for the hero"
  type MetaData {
    "Type will likely be 'learning path"
    type: String
    "How many resources are in the list"
    numberOfLearningResources: Int
    "How long the path takes, stored as a string"
    timeToComplete: String
    "Date published, stored as a string"
    datePublished: String
  }

  "Topics of the path"
  type Topics {
    topicId: String
    topicName: String
    topicUrl: String
  }
`;