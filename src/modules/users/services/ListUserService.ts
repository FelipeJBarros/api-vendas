import { IPaginatedUsers } from '../models/IPaginatedUsers';
import { UserRepository } from '../typeorm/repositories/UserRepository';

class ListUserService {
    public async execute(
        page: number,
        limit: number,
    ): Promise<IPaginatedUsers> {
        const userRepository = new UserRepository();
        const skip = (page - 1) * limit;
        const take = limit;
        const userList = await userRepository.findAll(page, skip, take);
        return userList;
    }
}

export default ListUserService;
