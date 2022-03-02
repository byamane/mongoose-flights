import mongoose from "mongoose"

const Schema = mongoose.Schema

const mealsSchema = new Schema({name: String})

const Meal = mongoose.model("Meal", mealsSchema)

export {
  Meal
}