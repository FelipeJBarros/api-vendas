import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('A product with this id is not found');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
