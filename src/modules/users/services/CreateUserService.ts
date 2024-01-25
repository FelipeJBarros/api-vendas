import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';

class CreateUserService {
    public async execute(
        name: string,
        email: string,
        password: string,
    ): Promise<User> {
        const userRepository = new UserRepository();
        const userExists = await userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Usuário com esse email já existe');
        }

        const newUser = await userRepository.create(name, email, password);
        return newUser;
    }
}

export default CreateUserService;
