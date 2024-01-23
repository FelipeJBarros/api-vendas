import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { ICreateProduct } from '../models/IRegisterProduct';
import Product from '../typeorm/entities/Product';

class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: ICreateProduct): Promise<Product> {
        const productsRepository = new ProductRepository();
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('Já existe um produto cadastrado com esse nome');
        }

        const newProduct = await productsRepository.create({
            name,
            price,
            quantity,
        });

        return newProduct;
    }
}

export default CreateProductService;
