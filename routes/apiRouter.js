const express = require('express')
const router = express.Router()
const Client = require('../models/client')

//GET all
router.get('/', async (req, res) => {
    try{
        const clients = await Client.find()
        res.json(clients)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})
//GET a specific instance
router.get('/:name', getClient, (req, res) => {
    res.send(res.client)
})
//POST data
router.post('/', async (req, res) => {
    console.log(req.body)
    const client = new Client({
        name: req.body.name,
        jobAddress: req.body.job,
        mailAddress: req.body.mail,
        phoneNumber: req.body.phone,
        materialInstalled: req.body.material,
        lastInstallDate: req.body.install        
    })
    //verify data is valid before submitting to database
    try{
        const newClient = await client.save()
        res.redirect('/new_client')
    } catch(err){
        res.status(400).json({ message: err.message}) //400 status means the user sent bad input and the server is fine
    }

})
//UPDATE an instance - update one field of the object
// router.put would update the whole object
router.put('/:name', getClient, async (req, res) => {
    
    res.client.name = req.body.name
    res.client.mailAddress = req.body.mailAddress
    res.client.jobAddress = req.body.jobAddress
    res.client.materialInstalled = req.body.materialInstalled
    res.client.phoneNumber = req.body.phoneNumber
    res.client.lastInstallDate = req.body.lastInstallDate
    

    try{
        const updatedClient = await res.client.save()
        return res.json(updatedClient)
    } catch(err){
        res.status(400).json({message: err.message})
    }

})
//DELETE an instance by looking up their name as the key 
router.delete('/:name', getClient, async (req, res) => {
    try{
        await res.client.remove()
        res.json({message: 'deleted client'})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//middleware to get the client so we dont have to repeat code for each request
async function getClient(req, res, next){
    let client;
    try{
        client = await Client.findOne({name: req.params.name})
        if(client == null){
            return res.status(404).json({message: 'Cannot find client'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.client = client //add a variable to the response object to be used by the functions calling this middleware
    next()
}

module.exports = router