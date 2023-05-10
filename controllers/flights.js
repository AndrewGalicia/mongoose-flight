const Flight = require('../models/flight');
const Ticket = require('../models/ticket');



module.exports = {
    index,
    new: newFlight,
    create,
    show
}

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { flights });
  }

  function newFlight(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('flights/new', { errorMsg: '' });
  }
  async function create(req, res) {
    try {
        await Flight.create(req.body);
        // Always redirect after CUDing data
        // We'll refactor to redirect to the movies index after we implement it
        res.redirect('/flights');
      } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
      }
    }

    async function show(req, res) {
        try {
            const flight = await Flight.findById(req.params.id);
            const tickets = await Ticket.find({ flight: flight._id });
            res.render('flights/show', {title: 'Flight Detail', flight, tickets });
        } catch (err) {
            // handle error
        }
    }
    
    
   
    
    // res.render('flights/show', { title: 'Flight Detail', flight });
