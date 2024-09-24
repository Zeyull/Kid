
import ArticlesController from '../controller/articles.controller';
import koaRouter from 'koa-router';
import announcementsRouter from './announcement';

const mikuRouter = new koaRouter({ prefix: "/miku" });
mikuRouter.get('/articles-list', ArticlesController.getArticleList);
mikuRouter.use(announcementsRouter.routes());

export default mikuRouter;