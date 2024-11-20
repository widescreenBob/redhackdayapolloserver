import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const mocks = {
  Query: () => ({
    tracksForHome: () => [...new Array(8)],
    hero: () => new Object,
  }),

  Track: () => ({
    id: () => "uuid0001",
    title: () => "Nullam Condimentum Elit Purus",
    author: () => {
      return {
        name: "Dr.L.Path",
        url:
          "https://bing.com",
      };
    },
    summary: () =>
      "Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus.",
    body: () => "Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla.Nullam id dolor id nibh ultricies vehicula ut id elit.Maecenas faucibus mollis interdum.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam quis risus eget urna mollis ornare vel eu leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur.Maecenas faucibus mollis interdum.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.Nulla vitae elit libero, a pharetra augue.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Donec ullamcorper nulla non metus auctor fringilla.",
    length: () => "5 minutes",
  }),

  HeroContent: () => ({
    title: () => "Get Started with RHEL",
    description: () => "Welcome to Red Hat. As a new user or even a longtime user of Red Hat products, it's important to keep your account information, user profile, and community profile up-to-date. Learn how to access your information, and understand the benefits of personalizing your preferences. ",
    cta: () => {
      return {
        text: "Download RHEL",
        url: "https://bing.com",
      };
    },
    media: () => "https://placehold.co/600x400",
    metadata: () => {
      return {
        type: "Learning Path",
        resourceCount: 8,
        time: "5 minutes",
        publishedDate: "April 26th 1992"
      };
    }
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