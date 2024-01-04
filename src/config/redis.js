const redis = require('redis');
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

module.exports = client; // Export the client instance to use it in other files
