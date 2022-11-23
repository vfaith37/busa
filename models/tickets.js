//const { __esModule } = require('firebase-tools/lib/logger')
const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    token : {
        type: String,
        required: true
    },
    qrCode:{
        type: String,
        required: true
    },
    user:{
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    }
})

module.exports = mongoose.model('Ticket',ticketSchema);