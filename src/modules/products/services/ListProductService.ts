import { IPaginatedProducts } from '../models/paginateProductModel';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
    public async execute(
        page: number,
        limit: number,
    ): Promise<IPaginatedProducts> {
        const productsRepository = new ProductRepository();
        const take = limit;
        const skip = (Number(page) - 1) * limit;
        const listResult = productsRepository.findAll(page, skip, take);
        return listResult;
    }
}

export default ListProductService;
