const config = {
    server: {
        port: process.env.SERVER_PORT
    },
    db: {
        db_host: process.env.DB_HOST,
        db_database: process.env.DB_DATABASE,
        db_user: process.env.DB_USER,
        db_port: process.env.DB_PORT,
        db_password: process.env.DB_PASSWORD,
    },
    log: {
        appenders: {
            cheese: { type: "file", filename: "logs/cheese.log" },
            access: { type: "file", filename: "logs/access.log" },
            db: { type: "file", filename: "logs/db.log" }
        },
        categories: {
            default: { appenders: ["cheese"], level: "info" },
            access: { appenders: ["access"], level: "info" },
            db: { appenders: ["db"], level: "info" }
        },
    },
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expire: process.env.JWT_EXPIRES,
    },
    aliyun: {
        oss: {
            access_key_id: process.env.ALIYUN_OSS_ACCESS_KEY_ID,
            access_key_secret: process.env.ALIYUN_OSS_ACCESS_KEY_SECRET,
            region: process.env.ALIYUN_OSS_REGION,
            bucket: process.env.ALIYUN_OSS_BUCKET_NAME,
            endpoint: process.env.ALIYUN_OSS_ENDPOINT
        }
    }
}
export default config;