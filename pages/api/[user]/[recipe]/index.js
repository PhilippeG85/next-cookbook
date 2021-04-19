import connectToDatabase from '../../../../utils/mongo'
import Recipe from '../../../../models/Recipe'

connectToDatabase()

export default async (req, res) => {
    const { recipe, user } = req.query
    const recipes = await Recipe.find({user, name: recipe})
    if (recipes.length === 0) {
        return res.status(404).send("Recipe doesn't exist")
    } else {
        return res.status(200).send({data: recipes})
    }
}