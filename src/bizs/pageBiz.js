const db = require('../common/db');
const cacheStore = require('../common/cacheStore');
const convertor = require('../common/convertor');
const getRedirectUrl = async strId => {
  let longUrl = cacheStore.get(strId);
  if (!longUrl) {
    let id = convertor.str2int(strId);
    longUrl = await db.findShortUrl(id);
  }
  return longUrl;
};

module.exports = {
  getRedirectUrl
};
