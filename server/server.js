const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./schemas');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
async function startServer() {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });
}
const PORT = process.env.PORT || 3001;



// if we're in production, serve client/build as static assets

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());
app.use(routes);

db.once('open', () => {
  startServer();
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}/graphql`));
});
