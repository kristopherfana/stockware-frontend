import { Category } from "../../../categories/model/categories.dto";
import { Image } from "../../../../shared/model/image.dto";
import { Product } from "../../../products/model/products.dto";
import { Role } from "./create-user.dto";

export interface UserDto {
    id: number;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    lastLogin: Date;
    created_at: Date;
    updated_at: Date;
    products: Product[];
    categories: Category[];
    token: string;
    tokenExpiry: string;
    image_url?: string;
}