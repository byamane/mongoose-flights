import { Flight } from "../models/flight.js"

function index(req, res){
  Flight.find({}).sort({departs: 'asc'}).exec ((error, flights) => {
    console.log(error)
    res.render("flights/", {
      error,
      flights
    })
  })
}

function newFlight(req, res){
  res.render("flights/new", {
    title: "Add Flight"
  })
}

function create(req, res){
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) return res.redirect('/flights/new')
    res.redirect('/flights')
  })
}

function show(req, res){
  Flight.findById(req.params.id, function (err, flight){
    res.render('flights/show', {
      title: "Flight Detail",
      flight
    })
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}


export {
  index,
  newFlight as new,
  create,
  show,
  createTicket,
}