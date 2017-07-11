const fs = require('fs');
const path = require('path');

module.exports = {
  loadRoutes(app, routesPath) {
    fs.readdirSync(routesPath)
      .forEach(filename => {
        let routeFilePath = path.join(routesPath, filename);
        if (fs.statSync(routeFilePath).isFile()) {
          let router = require(routeFilePath);
          app.use(router.routes());
        }
      });
  }
};
