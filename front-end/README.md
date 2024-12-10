# Front End

This is a basic demo that incorporates a GraphQL API of learning path content with the Red Hat Design System.

The purpose of this demo is to showcase that learning path content can be used outside of Drupal.

## Installation

This project requires users have [NodeJS v22.11.0](https://nodejs.org/) installed.

If using [Node Version Manager](https://github.com/nvm-sh/nvm), type `nvm use`. Install the version if required.

1. The front end requires Apollo Server to be running. Follow the [instructions](https://github.com/widescreenBob/redhackdayapolloserver/tree/main/server) in the README in the `server` directory to get Apollo Server running.
1. Once you have Apollo Server running at localhost:4000, continue to the next step.
1. In a new terminal window, `cd` to the `front-end` directory.
1. Type `npm ci`.
1. Run the server by typing `live-server`.

## Run the server

```
live-server
```
or

```
npx live-server
```

This will open a new tab in your browser where you can view the app/page.

## DX Utilities

We're using these utility classes in places throughout this demo.

If you want to see the documentation for these utilities, connect to the Corporate VPN and view the [DX Utilities docs](https://uxdd.pages.corp.redhat.com/dx-utilities/foundations/color/).
