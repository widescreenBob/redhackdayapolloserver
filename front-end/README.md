# Front End

This is a basic demo that incorporates a (coming soon) GraphQL API of learning path content with the Red Hat Design System.

The purpose of this demo is to showcase that learning path content can be used outside of Drupal.

## Installation

This project requires users have [NodeJS v22.11.0](https://nodejs.org/) installed.

1. cd to the `front-end` directory.
1. Type `npm ci`.
1. We're currently querying the Github GraphQL API, and they require a Personal Access Token. Create one via that link.
    * You only need to give it Read permissions
1. Once you have your Personal Access Token, create `token-config.js` in `front-end/javascripts`.
1. Using the template below, paste your Personal Access Token where it says `{PERSONAL_ACCESS_TOKEN}`.

```js
const TOKEN = '{PERSONAL_ACCESS_TOKEN}';

export default TOKEN;
```

Install instructions subject to change after integrating the Learning Path GraphQL API. 😇


## Run the server

```
live-server
```

This will open a new tab in your browser where you can view the app/page.

## DX Utilities

We're using these utility classes in places throughout this demo.

If you want to see the documentation for these utilities, connect to the Corporate VPN and view the [DX Utilities docs](https://uxdd.pages.corp.redhat.com/dx-utilities/foundations/color/).
