const path = require('path');

module.exports = {
  port: 7777,
  routesPath: path.join(__dirname, 'routes'),
  dbFolder: path.join(__dirname, 'database')
};
