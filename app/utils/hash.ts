import { createHmac, randomBytes } from "crypto";

// 生成随机salt
export function generateSalt(length = 16) {
    return randomBytes(length).toString('hex');
}

// 加密pwd字段
export function createPwdHash(data: string, salt: string): string {
    return createHmac('md5', salt).update(data).digest('hex');
}