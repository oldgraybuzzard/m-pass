const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { User } = require('./models'); // Import the User model

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  // Start Apollo Server
  await server.start();
  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route to handle user information updates
app.post('/api/update-user', (req, res) => {
  const userInfo = req.body;

  // Implement user information handling logic here
  User.findOneAndUpdate(
    { email: userInfo.email },
    userInfo,
    { upsert: true, new: true },
    (err, user) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('User updated:', user);        
      }
    }
  );
  res.status(200).json({ message: 'User information updated successfully' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}!`);
  });
});
