import {Context} from 'koa';
import response from '../utils/response';

/**
 * CommonController
 * @class
 */
class CommonController{
    /**
     * Get 项目健康检查
     * @return
     */
    async healthCheck(ctx:Context){
        return response.success(ctx,'','',200);
    }
}

export default new CommonController;