import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

function index(req, res){
  Flight.find({}).sort({departs: 'asc'}).exec ((error, flights) => {
    console.log(error)
    res.render("flights/index", {
      error,
      flights
    })
  })
}

function newFlight(req, res){
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {departsDate})
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
  Flight.findById(req.params.id)
  .populate('meals')
  .exec(function(err, flight) {
    Meal.find({_id: {$nin: flight.meals}}, function(err, meals) {
      res.render('flights/show', {
        title: 'Flight Details', 
        flight,
        meals
      })
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

function addMeal(req, res){
  Flight.findById(req.params.id, function (err, flight) {
    flight.meals.push(req.body.mealId)
    flight.save(function (err) {
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
  addMeal,
}