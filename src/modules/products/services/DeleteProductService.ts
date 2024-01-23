import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class DeleteProductService {
    public async execute(id: string): Promise<void> {
        const productRespository = new ProductRepository();

        const product = await productRespository.findById(id);

        if (!product) {
            throw new AppError(
                'Produto com esse id não existe na base de dados',
            );
        }

        await productRespository.delete(product);
    }
}

export default DeleteProductService;
