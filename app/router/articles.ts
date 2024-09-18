
import ArticlesController from '../controller/articles.controller';
import koaRouter from 'koa-router';

const articleRouter = new koaRouter({ prefix: "/nozomi" });
articleRouter.get('/article', ArticlesController.getArticle);
articleRouter.post('/article', ArticlesController.addArticle);
articleRouter.put('/article', ArticlesController.updateArticle);

export default articleRouter;