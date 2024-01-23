import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class GetProductService {
    public async execute(productId: string): Promise<Product | null> {
        const productRepository = new ProductRepository();
        const product = productRepository.findById(productId);

        if (!product) {
            throw new AppError('Produto com esse id não existe');
        }

        return product;
    }
}

export default GetProductService;
