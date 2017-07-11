const db = require('../common/db');
const cacheStore = require('../common/cacheStore');
const convertor = require('../common/convertor');

const createShortUrl = async longUrl => {
  let nextId = await db.getNextId();
  let strId = convertor.int2str(nextId);
  let shortUrl = { id: nextId, longUrl };
  await db.insertShortUrl(shortUrl);
  cacheStore.set(strId, longUrl);
  return strId;
};

module.exports = {
  createShortUrl
};
