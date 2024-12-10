"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema");
const mock_1 = require("@graphql-tools/mock");
const schema_2 = require("@graphql-tools/schema");
const mocks = {
    Query: () => ({
        tracksForHome: () => [...new Array(8)],
        hero: () => new Object,
        social: () => new Object,
        card: () => [...new Array(8)],
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
        learningResourceIntroduction: () => "Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus.",
        learningResourceTimeToComplete: () => "5 minutes",
        learningResourceEducationalLevel: () => "Intermediate"
    }),
    HeroContent: () => ({
        heroHeading: () => "Hello Red Hack Day",
        heroDescription: () => "This is a demo of a page consuming a GraphQL endpoint consisting of Red Hat learning path content. This page is built with plain HTML, CSS, and JavaScript. It is not in Drupal. It showcases how anyone within our organization could implement this GraphQL API and use it in their project.",
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
        topicName: () => "Products",
        topicUrl: () => "https://bing.com"
    }),
};
async function startApolloServer() {
    const server = new server_1.ApolloServer({
        schema: (0, mock_1.addMocksToSchema)({
            schema: (0, schema_2.makeExecutableSchema)({ typeDefs: schema_1.typeDefs }),
            mocks,
        })
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server);
    console.log(`
    🚀  Server is running!
    📭  Query at ${url}
    `);
}
;
startApolloServer();
