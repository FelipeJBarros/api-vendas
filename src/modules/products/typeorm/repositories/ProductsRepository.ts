import { dataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import Product from '../entities/Product';
import { ICreateProduct } from '@modules/products/models/registerProductModel';

export class ProductRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Product);
    }

    public async create({ name, price, quantity }: ICreateProduct) {
        const newProduct = this.ormRepository.create({ name, price, quantity });
        await this.ormRepository.save(newProduct);
        return newProduct;
    }

    public async findByName(name: string): Promise<Product | null> {
        const product = await this.ormRepository.findOneBy({
            name,
        });

        return product;
    }
}
