
import AccountController from '../controller/account.controller';
import koaRouter from 'koa-router';

const accountRouter = new koaRouter({ prefix: "/nozomi" });
accountRouter.post('/register', AccountController.register);
accountRouter.post('/login', AccountController.login);

export default accountRouter;