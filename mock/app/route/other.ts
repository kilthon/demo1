import Router from 'koa-router';
import * as other from '../controller/other.ts';
// import Mock from 'mockjs'
// import data from '../../static/data.json' assert { type: 'json' };

const router = new Router();
router.prefix('/other');

router.get('/getCode', other.getCode);
export { router as OtherRouter };
