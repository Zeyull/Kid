import dotenv from 'dotenv';
// 初始化.env变量环境
dotenv.config();
import db from './db';
// 连接数据库
db();

import { Server } from "http";
import router from "./router";
import AccessLoggerMiddleware from "./middleware/access-logger.middleware";
import koaStatic from 'koa-static';
import Koa from 'koa';
import koaBody from 'koa-body';
import path from 'path';

const app = new Koa();

app
    .use(koaBody({
        multipart: true,
        formidable: {
            maxFieldsSize: 500 * 1024 * 1024, // 设置文件大小最多5MB
            hashAlgorithm: 'md5'
        }
    }))
    .use(koaStatic(path.join(__dirname, '..', 'statics')))
    .use(AccessLoggerMiddleware)
    .use(router.routes());

const run = (port: string): Server => {
    console.log(`项目启动，端口号${port}`)
    return app.listen(port);
}

export default run;
