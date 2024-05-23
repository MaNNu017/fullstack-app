import crypto from 'node:crypto'

export class Product {
    constructor( 
        public name: string,
        public description: string,
        public price: number,
        public stock: number,
        public id = crypto.randomUUID(),
    ) {}
}