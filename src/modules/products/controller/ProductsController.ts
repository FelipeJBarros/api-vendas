import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductService from '../services/ListProductService';
import GetProductService from '../services/GetProductService';
import UpdateProductService from '../services/UpdateProductService';

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

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, price, quantity } = request.body;
        const updateProductService = new UpdateProductService();

        const product = await updateProductService.execute(id, {
            name,
            price,
            quantity,
        });

        return response.json(product);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const getProductService = new GetProductService();

        const product = await getProductService.execute(id);

        return response.json(product);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;
        const listProductService = new ListProductService();

        const listProducts = await listProductService.execute(
            Number(page) || 1,
            Number(limit) || 10,
        );

        return response.json(listProducts);
    }
}

export default ProductsController;
