export const typeDefs = `#graphql

  type Pokemon {
    id: ID!
    name: String
  }

  type Query {
    pokemons: [Pokemon]
  }
`;
