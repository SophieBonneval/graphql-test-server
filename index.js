import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './_db.js';

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(game) {
      return db.reviews.filter((review) => review.game_id === game.id);
    },
  },
  Author: {
    reviews(author) {
      return db.reviews.filter((review) => review.author_id === author.id);
    },
  },
  Review: {
    author(review) {
      return db.authors.find((author) => author.id === review.author_id);
    },
    game(review) {
      return db.games.find((game) => game.id === review.game_id);
    },
  },
  Mutation: {
    addGame(_, args) {
      const game = {
        ...args.game,
        id: String(db.games.length + 1),
      };
      db.games.push(game);
      return game;
    },
    deleteGame(_, args) {
      const game = db.games.find((game) => game.id === args.id);
      if (!game) {
        throw new Error(`Couldn't find game with id ${args.id}`);
      }
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    editGame(_, args) {
      const game = db.games.find((game) => game.id === args.id);
      if (!game) {
        throw new Error(`Couldn't find game with id ${args.id}`);
      }
      Object.assign(game, args.edits);
      return game;
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
