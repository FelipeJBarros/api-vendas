import AppError from '@shared/errors/AppError';
import { ICreateProduct } from '../models/IRegisterProduct';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class UpdateProductService {
    public async execute(
        id: string,
        { name, price, quantity }: ICreateProduct,
    ): Promise<Product> {
        const productRepository = new ProductRepository();

        const product = await productRepository.findById(id);

        if (!product) {
            throw new AppError('Produto com esse id não encontrado');
        }

        const productExists = await productRepository.findByName(name);

        if (productExists) {
            throw new AppError('Um produto com esse nome já está cadastrado');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
