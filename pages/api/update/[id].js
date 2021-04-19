// /api/update/[id]
import connectToDatabase from '../../../utils/mongo'
import Recipe from '../../../models/Recipe'

connectToDatabase()

export default async (req, res) => {
    const body = req.body;
    const parseBody = JSON.parse(body)
    const { id } = req.query
    Recipe.findByIdAndUpdate(id, parseBody)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send('unable to update to database'))
}