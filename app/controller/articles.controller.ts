import { Context } from 'koa';
import response from '../utils/response';
import { accessLogger } from '../logger';
import { Rules } from 'async-validator';
import { validateParam } from '../utils/validate';
import articlesService from '../service/articles.service';
import { articleContentRules, articleTitleRules } from '../utils/rules';


/**
 * ArticlesController
 * @class 
 */
class ArticlesController {
    /**
     * 获取所有文章
     * @returns 所有文章信息
     */
    async getArticleList(ctx: Context) {
        try {
            const articleList = await articlesService.getArticlesList();
            response.success(ctx, {
                pagination: {
                    count: articleList.length
                },
                data: articleList

            }, '', 200);
        } catch (error) {
            response.error(ctx, error, '获取文章列表失败', 400);
        }
    }

    /**
     * 通过Id获取单篇文章
     * @param {number} id 文章ID
     * @returns 文章信息
     */
    async getArticle(ctx: Context) {
        const data = ctx.request.query;
        const id = Number(data.id);
        if (!Number.isFinite(id)) {
            return response.error(ctx, {}, 'id必须为数字', 200);
        }
        const article = await articlesService.getArticlesById(id);
        if (article) {
            response.success(ctx, article, '获取文章成功', 200);
        } else {
            response.error(ctx, {}, '该文章ID不存在', 400);
        }
    }

    /**
     * 新增文章
     * @param {string} title 文章标题
     * @param {string} content 文章内容
     * @param {string} picture 文章封面
     * @returns 文章信息
     */
    async addArticle(ctx: Context) {
        const data = ctx.request.body;
        const rules: Rules = {
            title: articleTitleRules,
            content: articleContentRules,
        };
        const { error } = await validateParam(data, rules);
        if (error) {
            return response.error(ctx, {}, error, 400);
        }
        const title = data.title;
        const content = data.content;
        const picture = data.picture;
        try {
            const article = await articlesService.addArticles({
                title,
                content,
                picture
            });
            response.success(ctx, { id: article.id }, '创建文章成功', 200);
        } catch (error) {
            accessLogger.info(`addArticle \n${error}`);
            response.error(ctx, error, '创建文章失败', 400);
        }
    }

    /**
     * 修改文章
     * @param {string} id 文章id
     * @param {string} title 文章标题
     * @param {string} content 文章内容
     * @param {string} picture 文章封面
     * @returns 文章信息
     */
    async updateArticle(ctx: Context) {
        const data = ctx.request.body;
        const param = ctx.request.query;
        const id = Number(param.id);
        if (!Number.isFinite(id)) {
            return response.error(ctx, {}, 'id必须为数字', 200);
        }
        const rules: Rules = {
            title: articleTitleRules,
            content: articleContentRules,
        };
        const { error } = await validateParam(data, rules);
        if (error) {
            return response.error(ctx, {}, error, 400);
        }

        const findArticle = await articlesService.getArticlesById(id)
        if (!findArticle) {
            return response.error(ctx, {}, '该文章ID不存在', 400);
        }

        try {
            findArticle.title = data.title || findArticle.title;
            findArticle.content = data.content || findArticle.content;
            findArticle.picture = data.picture || findArticle.picture;

            findArticle.save();
            response.success(ctx, { id: findArticle.id }, '修改文章成功', 200);
        } catch (error) {
            accessLogger.info(`updateArticle \n${error}`);
            response.error(ctx, error, '修改文章失败', 400);
        }
    }


}
export default new ArticlesController;