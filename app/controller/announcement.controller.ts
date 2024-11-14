import { Context } from 'koa';
import response from '../utils/response';
import { accessLogger } from '../logger';
import { Rules } from 'async-validator';
import { validateParam } from '../utils/validate';
import { articleContentRules, articleTitleRules } from '../utils/rules';
import announcementsService from '../service/announcements.service';


/**
 * AnnouncementsController
 * @class 
 */
class AnnouncementsController {
    /**
     * 获取所有公告内容
     * @returns 所有公告内容
     */
    async getAnnouncementsList(ctx: Context) {
        try {
            const announcementsList = await announcementsService.getAnnouncementsList();
            response.success(ctx, announcementsList, '', 200);
        } catch (error) {
            response.error(ctx, error, '获取公告列表失败', 400);
        }
    }

    /**
     * 获取单个公告
     * @param {number} id 公告ID
     * @returns 单个公告内容
     */
      async getAnnouncement(ctx: Context) {
        const data = ctx.request.query;
        const id = Number(data.id);
        if (!Number.isFinite(id)) {
            return response.error(ctx, {}, 'id必须为数字', 200);
        }
        
        const announcement = await announcementsService.getAnnouncementById(id);
        if(announcement) {
            response.success(ctx, announcement, '获取公告成功', 200);
        }else{
            response.error(ctx, {}, '该公告ID不存在', 400);
        }
    }

    /**
    * 新增公告
    * @param {string} content 公告内容
    * @param {string} icon 图标
    * @param {string} announcement_time 公告时间
    * @param {string} color Icon颜色
    * @returns 公告
    */
    async addAnnouncement(ctx: Context) {
        const data = ctx.request.body;

        const content = data.content;
        const icon = data.icon;
        const announcement_time = data.announcement_time;
        const color = data.color;
        try {
            const announcement = await announcementsService.addAnnouncement({
                content,
                icon,
                announcement_time,
                color
            });
            response.success(ctx, announcement, '创建公告成功', 200);
        } catch (error) {
            accessLogger.info(`addAnnouncement \n${error}`);
            response.error(ctx, error, '创建公告失败', 400);
        }
    }

    /**
    * 修改公告
    * @param {number} id 公告ID
    * @param {string} content 公告内容
    * @param {string} icon 图标
    * @param {string} announcement_time 公告时间
    * @param {string} color Icon颜色
    * @returns 公告ID
    */
    async updateAnnouncement(ctx: Context) {
        const data = ctx.request.body;
        const param = ctx.request.query;
        const id = Number(param.id);
        if (!Number.isFinite(id)) {
            return response.error(ctx, {}, 'id必须为数字', 200);
        }

        const findAnnouncement = await announcementsService.getAnnouncementById(id)
        if (!findAnnouncement) {
            return response.error(ctx, {}, '该公告ID不存在', 400);
        }

        try {
            findAnnouncement.content = data.content || findAnnouncement.content;
            findAnnouncement.icon = data.icon || findAnnouncement.icon;
            findAnnouncement.announcement_time = data.announcement_time || findAnnouncement.announcement_time;
            findAnnouncement.color = data.color || findAnnouncement.color;

            findAnnouncement.save();
            response.success(ctx, { id: findAnnouncement.id }, '修改公告成功', 200);
        } catch (error) {
            accessLogger.info(`updateAnnouncement \n${error}`);
            response.error(ctx, error, '修改公告失败', 400);
        }
    }

    /**
    * 删除公告
    * @param {number} id 公告ID
    * @returns 公告ID
    */
    async deleteAnnouncement(ctx: Context) {
        const param = ctx.request.query;
        const id = Number(param.id);
        if (!Number.isFinite(id)) {
            return response.error(ctx, {}, 'id必须为数字', 200);
        }

        try {
            const findAnnouncement = await announcementsService.getAnnouncementById(id)
            if (!findAnnouncement) {
                return response.error(ctx, {}, '该公告ID不存在', 400);
            }

            findAnnouncement.destroy();
            response.success(ctx, { id: findAnnouncement.id }, '删除公告成功', 200);
        } catch (error) {
            accessLogger.info(`deleteAnnouncement \n${error}`);
            response.error(ctx, error, '删除公告失败', 400);
        }
    }

}
export default new AnnouncementsController;