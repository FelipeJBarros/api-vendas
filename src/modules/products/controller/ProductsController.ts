import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductService from '../services/ListProductService';

class ProductsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;
        const createProduct = new CreateProductService();

        const newProduct = await createProduct.execute({
            name,
            price,
            quantity,
        });

        return response.json(newProduct);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;
        const listProductService = new ListProductService();

        const listProducts = await listProductService.execute(
            Number(page) || 0,
            Number(limit) || 10,
        );

        return response.json(listProducts);
    }
}

export default ProductsController;
