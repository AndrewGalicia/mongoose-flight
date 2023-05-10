const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
}

async function newTicket(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    const flights = await Flight.find({});
    console.log('new ticket works')
    res.render('tickets/new', { errorMsg: '', flights});
  }
// async function create(req,res) {
//     console.log("works?")
//     try {
//         await Ticket.create(req.body);
//       } catch (err) {
//         console.log(err);
//       }
//       const flight = await Flight.findById(req.params.id);
//       res.redirect(`flights/new}`, flight);
//     }

async function create(req, res) {
    try {
      const ticket = await Ticket.create(req.body);
      const flight = await Flight.findById(req.body.flight);
      res.redirect(`/flights/${flight._id}`);
    } catch (err) {
      console.log(err);
      res.render('tickets/new', { errorMsg: 'Failed to create ticket', flights: await Flight.find({}) });
    }
  }