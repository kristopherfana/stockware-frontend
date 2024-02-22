import { Category } from "../../Pages/categories/model/categories.dto";
import { Product } from "../../Pages/products/model/products.dto";
import { UserDto } from "../../Pages/shared/auth/dto/user.dto";

export interface Image {
    id: number;
    url: string;
    name?: string;
    user: UserDto;
    category: Category;
    product: Product;
}