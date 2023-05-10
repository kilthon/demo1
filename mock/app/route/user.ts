import Router from 'koa-router';
import { create_token } from '../../utils/token.ts';
import { loginType } from '@/types/api';
// import Mock from 'mockjs'
// import data from '../../static/data.json' assert { type: 'json' };

const router = new Router();
router.prefix('/user');

router.post('/login', (ctx) => {
  const req: loginType = JSON.parse(ctx.request.rawBody);
  console.log(req);
  const token = create_token(req.name);
  ctx.body = {
    code: 200,
    msg: '登陆成功！',
    data: {
      token,
    },
  };
});
export { router as UserRouter };
