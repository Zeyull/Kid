import StoredPicHash from '../model/stored_pic_hash';

class StoredPicHashService {
    async getPicHashByHash(hash: string): Promise<StoredPicHash | null> {
        return StoredPicHash.findOne({ where: { hash } });
    }

    async addPicHash(pic: { hash: string, url: string }): Promise<StoredPicHash> {
        return StoredPicHash.create<StoredPicHash>(pic);
    }
}

export default new StoredPicHashService;