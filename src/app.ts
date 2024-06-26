import express from 'express'
import { productRouter } from './product/product.routes.js'

const app = express()
app.use(express.json())

app.use('/api/products', productRouter)

app.use((_, res)=>{
    return res.status(404).send({message: 'Resource not found'})
})

app.listen(3000, () => {
    console.log("Server running okay!")
})
