import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';

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
}

export default ProductsController;
