import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import axios from 'axios';

const swapiUrl = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

const resolvers = {
  Query: {
    async planets() {
      const response = await axios.post(swapiUrl, {
        query: `
          query {
            allPlanets {
              planets {
                id
                name
              }
            }
          }
        `,
      });

      return response.data.data.allPlanets.planets;
    },
  },
};

// Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`🚀 Server ready at port 4000`);
