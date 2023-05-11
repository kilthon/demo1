import Router from 'koa-router';
import * as user from '../controller/user.ts';
// import Mock from 'mockjs'
// import data from '../../static/data.json' assert { type: 'json' };

const router = new Router();
router.prefix('/user');

router.post('/login', user.login);
router.post('/register', user.register);
export { router as UserRouter };
