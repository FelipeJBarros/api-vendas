import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ShowProductService {
  public async execute(id: string): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('A product with this id is not found');
    }

    return product;
  }
}

export default ShowProductService;
