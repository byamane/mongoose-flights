import mongoose from "mongoose"

const Schema = mongoose.Schema

const mealsSchema = new Schema({
  name: {type: String, required: true, unique: true}
})

const Meal = mongoose.model("Meal", mealsSchema)

export {
  Meal
}