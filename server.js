const { app } = require('./app');
const debug = require('debug')('hs:server');
const { createServer } = require('http');

/**
 * Get port from environment and store in Express.
 */
const { PORT = 3000 } = process.env;
app.set('port', PORT);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = err => {
  if (err.syscall !== 'listen') throw err;

  // handle specific listen errors with friendly messages
  const handleErrors = {
    EACCES: () => {
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
    },

    EADDRINUSE: () => {
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    },

    default: err => {
      throw err;
    }
  };

  handleErrors[err.code in handleErrors ? err.code : 'default'](err);
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  debug(`Listening on port ${PORT}`);
};

/**
 * Create HTTP server.
 */
const server = createServer(app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
