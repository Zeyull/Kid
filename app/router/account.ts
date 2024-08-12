
import AccountController from '../controller/account.controller';
import koaRouter from 'koa-router';

const accountRouter = new koaRouter({ prefix: "/nozomi" });
accountRouter.get('/account-info', AccountController.getAccountInfo);

export default accountRouter;