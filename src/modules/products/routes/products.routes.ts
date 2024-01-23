import { Router } from 'express';
import ProductsController from '../controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.list);
productsRouter.post('/', productsController.create);

export default productsRouter;
