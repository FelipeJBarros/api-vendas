import AppError from '@shared/errors/AppErrors';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExist = await userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError('This email already in use, try another one');
    }

    const hashadPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashadPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
