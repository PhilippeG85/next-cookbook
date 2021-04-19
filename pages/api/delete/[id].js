// api/delete/:id
import connectToDatabase from '../../../utils/mongo'
import Recipe from '../../../models/Recipe'

connectToDatabase()

export default async (req, res) => {
    const { id } = req.query
    Recipe.findByIdAndDelete(id)
        .then(() => {
            res.send('Recipe deleted')
        })
        .catch(err => res.status(400).send("Error: " + err))
}