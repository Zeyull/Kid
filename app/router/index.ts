import koaRouter from 'koa-router';
import commonRouter from './common';

const router = new koaRouter();
router.use(commonRouter.routes());
export default router;