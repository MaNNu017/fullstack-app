import { Repository } from "../shared/repository.js";
import { Product } from "./product.entity.js";

const products = [
    new Product(
    'Cafe molido',
    'Blend de café molido sin azúcar. 100% Tostado Natural Sin Azúcar.',
    151,
    101,
    'b05af906-b67a-45e9-8b4f-26af7e716513'
    ),
]

export class ProductRepository implements Repository<Product>{
    public findAll(): Product[] | undefined {
        return products
    }

    public findOne(item: { id: string; }): Product | undefined {
        return products.find((product)=>product.id === item.id) 
    }

    public add(item: Product): Product | undefined {
        products.push(item)
        return item
    }

    public update(item: Product): Product | undefined {
        const productIdx = products.findIndex((product) => product.id === item.id)
        if(productIdx !== -1){
            products[productIdx]= {...products[productIdx], ...item}
        }
        return products[productIdx]
    }

    public delete(item: { id: string; }): Product | undefined {
        const productIdx = products.findIndex((product) => product.id === item.id)
        if(productIdx !== -1){
            const deletedProducts = products[productIdx]
            products.splice(productIdx, 1)
            return deletedProducts
        }
    }
}