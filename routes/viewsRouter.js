const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {layout: 'layout'})
})

router.get('/new_client', (req, res) => {
    res.render('newClient', {layout: 'layout'})
})

router.get('/update_client/:name', (req, res) => {
    res.render('updateClient', {layout: 'layout', name: req.params.name})
})

module.exports = router