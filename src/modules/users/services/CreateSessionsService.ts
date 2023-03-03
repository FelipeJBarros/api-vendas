import AppError from '@shared/errors/AppErrors';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
//   token: string;
// }

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('A user with the given email does not existt', 401);
    }

    const confirmedPassword = await compare(password, user.password);

    if (!confirmedPassword) {
      throw new AppError('The entered password is incorrect', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
