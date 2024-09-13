import Account from '../model/account';

class AccountService {
    async getAccountById(id: number): Promise<Account | null> {
        return Account.findByPk(id);
    }

    async getAccountByUserName(username: string): Promise<Account | null> {
        return Account.findOne({
            where: {
                username: username
            }
        });
    }

    async addAccount(user: { username: string, password: string, description: string, salt: string }) {
        return Account.create(user);
    }
}

export default new AccountService;