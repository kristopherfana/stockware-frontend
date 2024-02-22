import { Image } from "../../../shared/model/image.dto";
import { Product } from "../../products/model/products.dto";

export interface Category {
    id: number;
    name: string;
    products: Product[];
    image_url: string;
}