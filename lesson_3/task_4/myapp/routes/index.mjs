import { Router } from 'express'

const router = Router()


const links ={
    about:'about.html',
    products:'/products',
    addProducts:'/product/add',
}

router.get(['/main','/'], (req, res) => {
    res.render('index', {title:'main', urls: links })
})

export default router