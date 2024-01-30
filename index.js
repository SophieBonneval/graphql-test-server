import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

// Find file directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to load GraphQL schema
function loadSchema() {
  const schemaFilePath = join(__dirname, './schema.graphql');
  return readFileSync(schemaFilePath, 'utf8');
}

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
    async vehicles() {
      const response = await axios.post(swapiUrl, {
        query: `
          query {
            allVehicles {
              vehicles {
                name
                filmConnection {
                  films {
                    title
                    releaseDate
                  }
                }
              }
            }
          }
        `,
      });
      return response.data.data.allVehicles.vehicles;
    },
    async starships() {
      const response = await axios.post(swapiUrl, {
        query: `
          query {
            allStarships {
              starships {
                id
                name
                crew
                costInCredits
                MGLT
                filmConnection {
                  films {
                    title
                    releaseDate
                  }
                }
              }
            }
          }
        `,
      });
      return response.data.data.allStarships.starships;
    },
  },
};

// Server setup
const server = new ApolloServer({
  typeDefs: loadSchema(),
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`🚀 Server ready at port 4000`);
