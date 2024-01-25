import User from '../typeorm/entities/User';

export interface IPaginatedUsers {
    items_per_page: number;
    total: number;
    current_page: number;
    data: User[];
}
