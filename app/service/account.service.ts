import Account from '../model/account';

class AccountService {
    async getAccountById(id: number) {
        return Account.findByPk(id);
    }
}

export default new AccountService;