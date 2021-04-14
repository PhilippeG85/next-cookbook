import connectToDatabase from '../../utils/mongo'
import Recipe from '../../models/Recipe'

connectToDatabase()

export default async (req, res) => {
    const { user } = req.query
    const recipes = await Recipe.find({user})
    res.json({data: recipes})
}