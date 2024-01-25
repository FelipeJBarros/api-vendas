import { Repository } from 'typeorm';
import User from '../entities/User';
import { dataSource } from '@shared/typeorm';
import { IPaginatedUsers } from '@modules/users/models/IPaginatedUsers';

export class UserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = dataSource.getRepository(User);
    }

    public async create(
        name: string,
        email: string,
        password: string,
    ): Promise<User> {
        const newUser = this.ormRepository.create({
            name,
            email,
            password,
        });
        await this.ormRepository.save(newUser);
        return newUser;
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);
        return user;
    }

    public async delete(user: User): Promise<void> {
        await this.ormRepository.remove(user);
    }

    public async findAll(
        page: number,
        skip: number,
        take: number,
    ): Promise<IPaginatedUsers> {
        const [users, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const results: IPaginatedUsers = {
            items_per_page: take,
            current_page: page,
            total: count,
            data: users,
        };

        return results;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOneBy({ id });
        return user;
    }

    public async findByName(name: string): Promise<User | null> {
        const user = await this.ormRepository.findOneBy({ name });
        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.ormRepository.findOneBy({ email });
        return user;
    }
}
