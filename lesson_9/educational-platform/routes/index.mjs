import { Router } from 'express'

const router = Router()
router.get('/', (req, res) => {
    res.render('index', { title: 'My education manager app' })
})
// router.delete('/', (req, res) => { })

export default router