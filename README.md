# GraphQL Test Server

This is a really simple [GraphQL](https://github.com/apollostack/graphql-tools) test server. 

- The `main` branch is using an internal databse 
- The `star-wars-api` branch is using [Apollo's Star Wars API](https://studio.apollographql.com/public/star-wars-swapi/variant/current/home)
- The `pokemon-api` branch is using [Apollo's Pokemon API](https://studio.apollographql.com/public/poke-gql/variant/current/home)

All 3 versions are running with [Apollo Server](https://github.com/apollostack/apollo-server)

## Installation

Clone the repository and run `npm install`

```
git clone https://github.com/SophieBonneval/graphql-test-server.git
cd graphql-test-server
npm install
```

## Starting the server

```
npm start
```

The server will run on port 4000. You can change this by editing `index.js`.