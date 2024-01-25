import { IPaginatedProducts } from '../models/IPaginateProduct';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
    public async execute(
        page: number,
        limit: number,
    ): Promise<IPaginatedProducts> {
        const productsRepository = new ProductRepository();
        const take = limit;
        const skip = (page - 1) * limit;
        const listResult = await productsRepository.findAll(page, skip, take);
        return listResult;
    }
}

export default ListProductService;
