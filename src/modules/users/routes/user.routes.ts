import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.list);
userRouter.post(
    '/',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    userController.create,
);

export default userRouter;
