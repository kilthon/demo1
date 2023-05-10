import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import data from './static/data.json' assert { type: 'json' };
import { UserRouter } from './app/route/user.ts';

const app = new Koa();
const router = new Router();

router.get('/test', (ctx) => {
  ctx.body = data;
});

// 注意cors要在router前面使用
app.use(cors());
app.use(bodyParser());
app.use(UserRouter.routes()).use(UserRouter.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(9999, () => console.log('server is listening at 9999'));
