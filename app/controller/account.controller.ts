import { Context } from 'koa';
import response from '../utils/response';
import AccountService from '../service/account.service';
import { createPwdHash, generateSalt } from '../utils/hash';
import { accessLogger } from '../logger';
import { sign, verify } from '../utils/auth';
import { Rules } from 'async-validator';
import { passwordRules, usernameRules } from '../utils/rules';
import { validateParam } from '../utils/validate';


/**
 * AccountController
 * @class 
 */
class AccountController {
    /**
    * Post 新增用户
    * @param {string} username 用户名
    * @param {string} password 密码
    * @return 用户信息
    */
    async register(ctx: Context) {
        const data = ctx.request.body;
        const rules: Rules = {
            username: usernameRules,
            password: passwordRules
        }
        const { error } = await validateParam(data, rules);
        if (error) {
            return response.error(ctx, {}, error, 400);
        }

        const username = data.username;
        const pwd = data.password;
        const description = data.description;
        // 判重
        const findUser = await AccountService.getAccountByUserName(username);
        if (findUser) {
            return response.error(ctx, {}, '该用户名已经存在了', 400);
        }
        const salt = generateSalt();
        const password = createPwdHash(pwd, salt);
        try {
            const user = await AccountService.addAccount({
                username,
                password,
                description,
                salt
            });
            response.success(ctx, { id: user.id }, '创建用户成功', 200);
        } catch (error) {
            accessLogger.info(`addAccount \n${error}`);
            response.error(ctx, error, '创建用户失败', 400);
        }
    }

    /**
    * Post 用户登录
    * @param {string} username 用户名
    * @param {string} password 密码
    * @return 用户信息
    */
    async login(ctx: Context) {
        const data = ctx.request.body;
        const username = String(data.username);
        const pwd = String(data.password);
        const findUser = await AccountService.getAccountByUserName(username);
        if (!findUser) {
            return response.error(ctx, {}, '用户名或密码错误', 400);
        }
        const salt = findUser.salt;
        const handledPwd = createPwdHash(pwd, salt);

        if (findUser.username === username && findUser.password === handledPwd) {
            const token = sign(findUser);
            response.success(ctx, { token, id: findUser.id }, '登录成功', 200);
        } else {
            response.error(ctx, {}, '用户名或密码错误', 400);
        }
    }

    /**
    * Post 验证Token是否有效
    * @param {string} token 令牌
    * @return 用户信息
    */
    async verifyToken(ctx: Context) {
        const data = ctx.request.body;
        const token = String(data.token);
        if (token !== undefined && token !== null) {
            const { user, error } = verify(token);
            if (user !== null) {
                const userData = user.user;
                response.success(ctx, { username: userData.username, avatar: userData.avatar, description: userData.description }, 'Token有效', 200);
            } else if (error !== null) {
                response.error(ctx, {}, error.message, 4000)
            } else {
                response.error(ctx, {}, 'Token失效', 4000)
            }
        } else {
            response.error(ctx, {}, 'Token为空', 4000)
        }
    }

}
export default new AccountController;