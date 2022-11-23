const express = require('express');
const {generateAndSaveTicket, checkTicket, getAllTickets, getTicketById, deleteTicketById} = require('../controllers/tickets')
const router = express.Router();


//router.route('/sendEventTicket/:userId').post(sendEventTicket)
//router.route('/getEventTicket/:userId').get(getEventTicket)

router.route('/generateAndSaveTicket/:userId').post(generateAndSaveTicket)
router.route('/getAllTickets').get(getAllTickets)
router.route('/getTicketById/:ticketId').get(getTicketById)
router.route('/checkToken').get(checkTicket);
router.route('/deleteTicketById/:ticketId').delete(deleteTicketById)
module.exports = router