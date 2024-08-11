import commonController from '../controller/common.controller';
import koaRouter from 'koa-router';

const commonRouter = new koaRouter({ prefix: "/nozomi" });
commonRouter.get('/health-check', commonController.healthCheck);

export default commonRouter;