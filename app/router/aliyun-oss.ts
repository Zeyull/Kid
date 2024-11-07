
import AliyunOSSController from '../controller/aliyun-oss.controller';
import koaRouter from 'koa-router';

const aliyunOSSRouter = new koaRouter({ prefix: "/nozomi/oss" });
aliyunOSSRouter.post('/upload-pic', AliyunOSSController.uploadPic);


export default aliyunOSSRouter;