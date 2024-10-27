import AnnouncementsController from '../controller/announcement.controller';
import koaRouter from 'koa-router';

const announcementsRouter = new koaRouter();
announcementsRouter.get('/announcements-list', AnnouncementsController.getAnnouncementsList);

export default announcementsRouter;