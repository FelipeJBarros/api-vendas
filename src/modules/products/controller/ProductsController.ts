import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductService from '../services/ListProductService';
import GetProductService from '../services/GetProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

const DEFAULT_NUMBER_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 10;
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

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const deleteProductService = new DeleteProductService();

        await deleteProductService.execute(id);

        return response.json([]);
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
            Number(page) || DEFAULT_NUMBER_PAGE,
            Number(limit) || DEFAULT_PAGE_LIMIT,
        );

        return response.json(listProducts);
    }
}

export default ProductsController;
