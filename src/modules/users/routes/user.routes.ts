import { Router } from 'express';
import UserController from '../controllers/UserController';
import { Joi, Segments, celebrate } from 'celebrate';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.list);
userRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    userController.create,
);

export default userRouter;
