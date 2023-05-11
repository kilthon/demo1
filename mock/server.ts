import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import data from './static/data.json' assert { type: 'json' };
import { UserRouter } from './app/route/user.ts';
import { OtherRouter } from './app/route/other.ts';

const app = new Koa();
const router = new Router();

router.get('/test', (ctx) => {
  ctx.body = data;
});

app.keys = ['some secret hurr'];
const config = {
  key: 'koa.sess',
  renew: true,
};

// 注意cors要在router前面使用
app.use(cors());
app.use(bodyParser());
app.use(session(config, app));
app.use(UserRouter.routes()).use(UserRouter.allowedMethods());
app.use(OtherRouter.routes()).use(OtherRouter.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(9999, () => console.log('server is listening at 9999'));
