// /api/update/[id]
import connectToDatabase from '../../../utils/mongo'
import Recipe from '../../../models/Recipe'

connectToDatabase()

export default async (req, res) => {
    const body = req.body;
    const parseBody = JSON.parse(body)
    const { id } = req.query
    const updateRecipe = {
        name: parseBody.name,
        ingredient: parseBody.ingredient,
        time: parseBody.time,
        level: parseBody.level,
        tag: parseBody.tag,
        description: parseBody.description,
        user: parseBody.user
    }
    Recipe.findByIdAndUpdate(id, updateRecipe)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send('unable to update to database'))
}