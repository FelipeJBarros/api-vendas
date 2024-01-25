import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

const DEFAULT_NUMBER_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 10;

class UserController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createUserService = new CreateUserService();
        const { name, email, password } = request.body;

        const newUser = await createUserService.execute(name, email, password);

        return response.json(newUser);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listUserService = new ListUserService();
        const { page, limit } = request.params;
        const userList = await listUserService.execute(
            Number(page) | DEFAULT_NUMBER_PAGE,
            Number(limit) | DEFAULT_PAGE_LIMIT,
        );
        return response.json(userList);
    }
}

export default UserController;
