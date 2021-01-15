const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    jobAddress: {
        type: String
    },
    mailAddress: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    materialInstalled: {
        type: String
    },
    lastInstallDate: {
        type: Date
    }
})

module.exports = mongoose.model('Client', clientSchema)