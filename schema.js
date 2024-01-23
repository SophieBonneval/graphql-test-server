export const typeDefs = `#graphql

  type Planet {
    id: ID!
    name: String
  }

  type Query {
    planets: [Planet]
  }
`;
