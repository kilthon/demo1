import Router from 'koa-router';
import data from '../static/data.json' assert { type: 'json' };

const router = new Router();
router.prefix('/api/user');

router.post('/login', (ctx) => {
  const req = ctx.request.body;
  console.log(req);
  ctx.body = data;
});
export { router as UserRouter };
