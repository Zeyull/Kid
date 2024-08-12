import koaRouter from 'koa-router';
import commonRouter from './common';
import accountRouter from './account';

const router = new koaRouter();
router.use(commonRouter.routes());
router.use(accountRouter.routes());
export default router;