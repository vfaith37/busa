//const express = require('express');
const User = require("../models/user");
//const sendTicket = require('../helper/tickets')
//const {handleWebhook} = require('../controllers/webhook')
const {sendQr} = require('../helper/sendEmail')
//const initPay = require('../helper/paystack')
//const event = require('../controllers/webhook')
const qr = require('qrcode')
const Token = require('../models/token')
const moment = require('moment');
const axios = require('axios');
const Ticket = require('../models/tickets')






exports.generateAndSaveTicket = async  (req,res) =>{
try{
    const user = await User.findById(req.params.userId)
    const token = await new Token({
        token: ((Math.random() + 1).toString(36).substring(7)).toUpperCase(),
        isUsed: false,
        email: user.email,
        expiryDate: moment(new Date()).add(30, 'm').toDate()
      }).save();
    
      const qrCode = qr.toString(token.token,(err,qrCodee)=>{return qrCodee})
      const ticket = await new Ticket({
        token: token.token,
        qrCode,
        user
      }).save();
    
      console.log(qrCode);

    res.status(200).json({
        success: true,
        data: ticket
    
    })

} catch(error){
    console.log(error)
    res.status(400).json({
        "success": false,
        "msg":"Internal Error Occured"
    })
}

}

exports.getAllTickets = async(req,res) =>{
  try {
    const tickets = await Ticket.find({})

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
    
  }
}

exports.getTicketById = async (req,res) =>{
  try{
    const ticket = await Ticket.findById(req.params.ticketId)

    res.status(200).json({
      success: true,
      data: ticket
    })
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
  }
}
exports.deleteTicketById = async (req,res) =>{
  try{
    const ticket = await Ticket.findByIdAndDelete(req.params.ticketId)

    res.status(200).json({
      success: true,
      data: ticket
    })
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
  }
}


exports.checkTicket = async (req,res) =>{
  try{

  
  const token = req.body
  let check = await Token.findOne({
    token: token,
  });
  console.log(check);
  if(!check){
    res.status(400).json({
      message: "Token not found in the Database"
    })
  }

  if(check.expiryDate < new Date()){
    res.status(400).json({
      message:"Token expired."
    })
  }
  await Token.findByIdAndRemove(check._id);


  //  res.status(200).send({
  //   message: "Token verified successfully"
  // });

  
} catch (error) {
  console.log(error)
}
}





// exports.getAllTickets = async (req,res) =>{

// }







//  exports.sendEventTicket = async (req,res)=>{
//     try{
//         const user = await User.findById(req.params.userId)
        
//             sendTicket(user.email,"BUSA Show Ticket","Your Ticket","BUSA","ezehdavidhoddy@gmail.com")


//     res.status(200).json({
//         success: true  
//      })
    
// } catch (error){
//     console.log(error)
//     res.status(500).json({
//         success:false,
//         msg:error
//     })
// }







