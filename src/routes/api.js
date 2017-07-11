const Router = require('koa-router');
const apiBiz = require('../bizs/apiBiz');

const router = new Router({
  prefix: '/api/v1'
});

router.post('/', async ctx => {
  let data = ctx.request.body;
  if (!data.longUrl) {
    return ctx.throw(400, 'ERROR PARAMETER.');
  }
  let shortId = await apiBiz.createShortUrl(data.longUrl);
  ctx.body = { shortId };
});

module.exports = router;
