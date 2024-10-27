import Announcements from '../model/announcements';

class AnnouncementsService {
    async getAnnouncementsList(): Promise<Announcements[]> {
        return Announcements.findAll();
    }

    async addAnnouncement(announcement: { content: string, icon: string, announcement_time: string, color: string }): Promise<Announcements> {
        return Announcements.create<Announcements>(announcement);
    }

    async getAnnouncementById(id: number): Promise<Announcements | null> {
        return Announcements.findByPk(id);
    }

}

export default new AnnouncementsService;