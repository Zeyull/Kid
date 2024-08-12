import { Context } from 'koa';
import response from '../utils/response';
import AccountService from '../service/Account.service';


/**
 * AccountController
 * @class 
 */
class AccountController {
    /**
    * Get todo 测试使用，待删除
    * @param {string} uuid 用户ID
    * @return 用户信息
    */
    async getAccountInfo(ctx: Context) {
        const data = ctx.request.query;
        const id = Number(data.id);
        const user = await AccountService.getAccountById(id);
        if (user === null) {
            return response.error(ctx, '该用户不存在', {}, 400);
        }
        response.success(ctx, { user }, '获取用户信息', 200);
    }

}
export default new AccountController;