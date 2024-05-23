import { Request, Response, NextFunction } from "express"
import { ProductRepository } from "./product.repository.js"
import { Product } from "./product.entity.js"

const repository = new ProductRepository()

function sanitizeProductInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
    }
    
    Object.keys(req.body.sanitizedInput).forEach(key=>{
        if(req.body.sanitizedInput[key] === undefined)
        delete req.body.sanitizedInput[key]
    })
    next()
}

function findAll(req: Request, res: Response){
    res.json({data: repository.findAll()})
}

function findOne(req: Request, res: Response){
    const product = repository.findOne({id: req.params.id})
    if(!product){
        return res.status(404).send({message:'Product not found'})
    }
    res.json({data: product})
}

function add(req: Request, res: Response){
    const input = req.body.sanitizedInput
    const productInput = new Product(
        input.name, 
        input.description, 
        input.price, 
        input.stock)
    const product = repository.add(productInput)
    return res.status(201).send({message: 'Product created', data: product})
}

function update(req: Request, res: Response){
    req.body.sanitizedInput.id = req.params.id
    const product = repository.update(req.body.sanitizedInput)
    
    if(!product){
        return res.status(404).send({message:'Product not found'})
    }

    return res.status(200).send({message: 'Product updated succesfully.', data: product})
}

function remove(req: Request, res: Response){
    const id = req.params.id
    const product = repository.delete({id})

    if(!product){
        res.status(404).send({message:'Object not found'})
    } else {
    res.status(200).send({message: 'Product deleted succesfully'})
    }
}

export {sanitizeProductInput, findAll, findOne, add, update, remove}