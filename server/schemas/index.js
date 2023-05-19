const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const typeDefs = require('./typedefs');

// Create a schema using the typedefs and resolvers
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;
