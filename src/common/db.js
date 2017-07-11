const path = require('path');
const Datastore = require('nedb');
const config = require('../config');

const urls = new Datastore({ filename: path.join(config.dbFolder, 'urls.db'), autoload: true });
const ids = new Datastore({ filename: path.join(config.dbFolder, 'ids.db'), autoload: true });


const db = {
  getNextId() {
    return new Promise((resolve, reject) => {
      ids.findOne({}, (err, doc) => {
        if (err) {
          return reject(err);
        }
        let nextId = doc ? doc.currentId + 1 : 1;
        ids.update({ _id: (doc || {})._id }, { $set: { currentId: nextId } }, { upsert: true }, (err, numAffected) => {
          if (err) {
            return reject(err);
          }
          if (numAffected > 0) {
            return resolve(nextId);
          }
          reject(new Error('Get next id failed, please retry'));
        });
      });
    });
  },
  insertShortUrl(shortUrl) {
    return new Promise((resolve, reject) => {
      urls.insert(shortUrl, (err, doc) => {
        if (err) { return reject(err); }
        resolve();
      });
    });
  },
  findShortUrl(id) {
    return new Promise((resolve, reject) => {
      urls.findOne({ id }, {}, (err, doc) => {
        if (err) { return reject(err); }
        if (!doc) {
          return reject(new Error('Short url not found.'));
        }
        resolve(doc.longUrl);
      });
    });
  }
};

module.exports = db;
