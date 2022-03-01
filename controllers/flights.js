import { Flight } from "../models/flight.js"

function index(req, res){
  Flight.find({}, function(error, flights){
    console.log(error)
    res.render("flights/index", {
      flights
    })
  })
}

function newFlight(req, res){
  res.render("flights/new")
}



export {
  index,
  newFlight as new,
}