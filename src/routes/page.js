const Router = require('koa-router');
const pageBiz = require('../bizs/pageBiz');

const router = new Router({
  prefix: ''
});

router.get(/^\/[a-zA-Z0-9]{5}$/, async ctx => {
  let shortId = ctx.request.url.slice(1);
  let redirectUrl = await pageBiz.getRedirectUrl(shortId);
  if (redirectUrl) {
    ctx.redirect(redirectUrl);
  } else {
    ctx.redirect('/');
  }
});

module.exports = router;
