 
import { Context } from 'koa';
import response from '../utils/response';
import OSS from 'ali-oss';
import storedPicHashService from '../service/stored_pic_hash.service';
import config from '../config';
import fs from 'fs';

const client = new OSS({
    accessKeyId: config.aliyun.oss.access_key_id as string,
    accessKeySecret: config.aliyun.oss.access_key_secret as string,
    region: config.aliyun.oss.region,
    bucket: config.aliyun.oss.bucket
});

/**
 * AliyunOSSController
 * @class
 */
class AliyunOSSController {
    /**
     * 上传图片
     * @return 图片的url
     */
    async uploadPic(ctx: Context) {
        try {
            const files = ctx.request.files; // 获取上传的文件
            if (!files || !files.image) {
                return response.error(ctx, '', 'No file uploaded.!', 400)
            }
            const file = files.image as any;
            const hash = file.hash;
            const fileBuffer = await fs.promises.readFile(file.filepath);
            const storedPic = await storedPicHashService.getPicHashByHash(hash);
            
            if (storedPic) {
                return response.success(ctx, { url: storedPic.url }, 'File uploaded successfully!', 200);
            } else {
                // 生成文件名，避免重名
                const fileName = `img/${Date.now()}_${file.originalFilename}`;
                // 上传文件到阿里云 OSS
                const result = await client.put(fileName, fileBuffer);

                await storedPicHashService.addPicHash({ hash, url: result.url });

                // 上传成功后，删除临时文件
                fs.unlink(file.filepath, (err) => {
                    if (err) {
                        console.error('Failed to delete the temporary file', err);
                    } else {
                        console.log('Temporary file deleted');
                    }
                });
                return response.success(ctx, { url: result.url }, 'File uploaded successfully!', 200);
            }
        } catch (error) {
            return response.error(ctx, '', 'Error uploading file.', 500);
        }

    }
}

export default new AliyunOSSController;