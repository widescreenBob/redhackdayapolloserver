import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const mocks = {
  Query: () => ({
    tracksForHome: () => [...new Array(8)],
    hero: () => new Object,
    social: () => new Object,
    card: () => new Object,
    topics: () => new Object,
  }),

  Track: () => ({
    learningResourceId: () => "uuid0001",
    learningResourceAlternativeHeading: () => "Nullam Condimentum Elit Purus",
    learningResourcePosition: () => 5,
    author: () => {
      return {
        authorName: "Dr.L.Path",
        authorUrl: "https://bing.com",
      };
    },
    learningResourceIntroduction: () =>
      "Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus.",
    learningResourceTimeToComplete: () => "5 minutes",
    learningResourceEducationalLevel: () => "Intermediate"
  }),

  HeroContent: () => ({
    heroHeading: () => "Get Started with RHEL",
    heroDescription: () => "Welcome to Red Hat. As a new user or even a longtime user of Red Hat products, it's important to keep your account information, user profile, and community profile up-to-date. Learn how to access your information, and understand the benefits of personalizing your preferences. ",
    metadata: () => {
      return {
        type: "Learning Path",
        numberOfLearningResources: 8,
        timeToComplete: "5 minutes",
        datePublished: "April 26th 1992"
      };
    },
    topics: () => {
      return {
        topicId: "Learning",
        topicName: "dc188-1213213",
        topicUrl: "https://bing.com"
      };
    }
  }),

  SocialShare: () => ({
    shareImageUrl: () => "https://placehold.co/600x400",
    shareImageAlt: () => "Get Started with RHEL"
  }),

  CardPreso: () => ({
    featureImageUrl: () => "https://placehold.co/600x400",
    featureImageAlt: () => "Get Started with RHEL",
    description: () => "Donec ullamcorper nulla non metus auctor fringilla.",
    title: () => "Learn some things",
    url: () => "https://bing.com",
    metadata: () => {
      return {
        type: "Learning Path",
        numberOfLearningResources: 8,
        timeToComplete: "5 minutes",
        datePublished: "April 26th 1992"
      };
    }
  }),

  Topics: () => ({
    topicId: () => "dc188-1213213",
    topicName:  () => "Products",
    topicUrl: () => "https://bing.com"
  }),
};

async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    })
   });
  const { url } = await startStandaloneServer(server);
  console.log(
    `
    🚀  Server is running!
    📭  Query at ${url}
    `
  )
};

startApolloServer();