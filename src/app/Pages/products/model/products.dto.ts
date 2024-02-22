import { Category } from "../../categories/model/categories.dto";
import { Image } from "../../../shared/model/image.dto";
import { UserDto } from "../../shared/auth/dto/user.dto";

export interface Product {
    id?: number;
    name: string;
    description?: string;
    quantity: number;
    marketing_text?: string;
    price?: number;
    cost?: number;
    profit?: number;
    createdBy?: UserDto;
    category: Category;
    created_at?: Date;
    updated_at?: Date;
    image_url?: string;
}