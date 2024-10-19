import { Router } from 'express'

const productRouter = Router()
const products = [
    {
      id: 1,
      title: 'iphone',
      price: 85.255,
      image: 'https://content2.rozetka.com.ua/goods/images/big/468888179.jpg',
      description: 'iphone 16'
    },
    {
      id: 2,
      title: 'macbook',
      price: 189.547,
      image: 'https://content1.rozetka.com.ua/goods/images/big/377397303.jpg',
      description: 'macbook pro 16'
    },

  ];
  

productRouter.get('/', (req, res) => {
    res.render('products', { products: products })
    })

 
export default productRouter