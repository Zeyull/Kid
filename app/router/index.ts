import koaRouter from 'koa-router';
import commonRouter from './common';
import accountRouter from './account';
import articleRouter from './articles';
import AuthMiddleware from '../middleware/auth.middleware';
import announcementsRouter from './announcement';

const router = new koaRouter();
router.use(commonRouter.routes());
router.use(accountRouter.routes());
router.use(announcementsRouter.routes());
// token 判断
router.use(AuthMiddleware);
router.use(articleRouter.routes());

export default router;