CREATE TABLE stored_pic_hash (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- 自增主键
    hash VARCHAR(255) NOT NULL UNIQUE,      -- 文件的哈希值，确保唯一性
    url TEXT NOT NULL                   -- 文件在 OSS 上的存储 URL
);