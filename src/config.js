const path = require('path');

module.exports = {
  port: 5001,
  routesPath: path.join(__dirname, 'routes'),
  dbFolder: path.join(__dirname, 'database')
};
