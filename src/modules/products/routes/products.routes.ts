import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductsController from '../controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.list);

productsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
    }),
    productsController.index,
);

productsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        }),
    }),
    productsController.create,
);

productsRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        }),
    }),
    productsController.update,
);

productsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
    }),
    productsController.delete,
);

export default productsRouter;
