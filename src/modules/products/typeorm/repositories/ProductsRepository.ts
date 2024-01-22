import { dataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import Product from '../entities/Product';

export class ProductRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Product);
    }

    public async findByName(name: string): Promise<Product | null> {
        const product = await this.ormRepository.findOneBy({
            name,
        });

        return product;
    }
}
