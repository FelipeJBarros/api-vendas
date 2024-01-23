import Product from '../typeorm/entities/Product';

export interface IPaginatedProducts {
    items_per_page: number;
    total: number;
    current_page: number;
    data: Product[];
}
