import { dataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import Product from '../entities/Product';
import { ICreateProduct } from '@modules/products/models/registerProductModel';
import { IPaginatedProducts } from '@modules/products/models/paginateProductModel';

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

    public async findAll(
        page: number,
        limit: number,
    ): Promise<IPaginatedProducts> {
        const [products, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(page * limit)
            .take(limit)
            .getManyAndCount();

        const result = {
            items_per_page: limit,
            total: count,
            current_page: page,
            data: products,
        };

        return result;
    }
}
