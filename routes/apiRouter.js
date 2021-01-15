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
router.get('/:id', getClient, (req, res) => {
    res.send(res.client)
})
//POST data
router.post('/', async (req, res) => {
    const client = new Client({
        name: req.body.name,
        email: req.body.email,
        jobAddress: req.body.jobAddress,
        mailAddress: req.body.mailAddress,
        phoneNumber: req.body.phoneNumber,
        materialInstalled: req.body.materialInstalled,
        lastInstallDate: req.body.lastInstallDate        
    })
    //verify data is valid before submitting to database
    try{
        const newClient = await client.save()
        res.status(201).json(newClient) //201 status means successfully create something
    } catch(err){
        res.status(400).json({ message: err.message}) //400 status means the user sent bad input and the server is fine
    }

})
//UPDATE an instance - update one field of the object
// router.put would update the whole object
router.patch('/:id', getClient, async (req, res) => {
    if(req.body.name != null){ //if the user passed a name to update
        res.client.name = req.body.name
    }
    if(req.body.email != null){ //if the user passed an email to update
        res.client.email = req.body.email
    }

    try{
        const updatedClient = await res.client.save()
        return res.json(updatedClient)
    } catch(err){
        res.status(400).json({message: err.message})
    }

})
//DELETE an instance
router.delete('/:id', getClient, async (req, res) => {
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
        client = await Client.findById(req.params.id)
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