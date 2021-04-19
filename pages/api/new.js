import Recipe from '../../models/Recipe'
import connectToDatabase from '../../utils/mongo'

connectToDatabase()

export default async (req, res) => {
    const body = req.body
    const recipe = JSON.parse(body)
    const newRecipe = new Recipe(recipe);
    newRecipe.save()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send('unable to save to database');
    });
}