const LRU = require('lru-cache');

const options = {
  max: 500,
  maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
};

const cache = LRU(options);

module.exports = {
  set(key, value) {
    cache.set(key, value);
  },
  get(key) {
    return cache.get(key);
  },
  del(key) {
    cache.del(key);
  },
  size() {
    return cache.length;
  }
};
