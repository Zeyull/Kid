import AnnouncementsController from '../controller/announcement.controller';
import koaRouter from 'koa-router';

const announcementsRouter = new koaRouter({ prefix: "/nozomi" });
announcementsRouter.get('/announcements-list', AnnouncementsController.getAnnouncementsList);
announcementsRouter.post('/announcement', AnnouncementsController.addAnnouncement);
announcementsRouter.put('/announcement', AnnouncementsController.updateAnnouncement);
announcementsRouter.delete('/announcement', AnnouncementsController.deleteAnnouncement);

export default announcementsRouter;