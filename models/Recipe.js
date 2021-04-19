import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredient: { type: Array, required: true },
    time: { type: String, required: true },
    level: { type: String, required: true },
    tag: { type: String, required: false },
    description: { type: Array, required: true },
    user: { type: String, required: true }
  });
  
module.exports = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);