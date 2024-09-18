import Articles from '../model/articles';

class ArticlesService {
    async getArticlesById(id: number): Promise<Articles | null> {
        return Articles.findByPk(id);
    }

    async addArticles(article: { title: string, content: string, picture?: string }): Promise<Articles> {
        return Articles.create<Articles>(article);
    }
}

export default new ArticlesService;