import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import axios from 'axios';

const pokemonAPI = 'https://beta.pokeapi.co/graphql/v1beta';

const resolvers = {
  Query: {
    async pokemons() {
      const response = await axios.post(pokemonAPI, {
        query: `
          query {
            pokemon_v2_pokemon {
              id
              name
            }
          }
        `,
      });
      return response.data.data.pokemon_v2_pokemon;
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
