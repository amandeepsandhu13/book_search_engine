const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const { authMiddleware } = require('./utils/auth');



const app = express();
const PORT = process.env.PORT || 3001;

//intialize apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = authMiddleware({ req });
    return { ...auth, req };  // Ensure context includes req
  },
  introspection: true,
  formatError: (err) => {
    // Log detailed error for debugging
    console.error(err);
    return err;
  }
});

(async() => {
  await server.start();
  // Apply Apollo middleware to the Express server
server.applyMiddleware({ app }); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  });
});
db.on('error', (error) => {
  console.error('Database connection error:', error);
});
})();
