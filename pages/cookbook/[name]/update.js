import { UserContext } from '../../../utils/userContext'
import { useContext, useEffect, useState } from 'react'
import Menu from '../../../components/Menu'

export default function Update() {
    const userName = useContext(UserContext);
    const [recipe, setRecipe] = useState({})

    useEffect(() => {
        if (userName) {
            loadData()
        }
    }, [userName])

    const loadData = async () => {
        const recipeName = window.location.pathname.split('/')
        const res = await fetch(`http://localhost:3000/api/${userName.email}/${recipeName[recipeName.length - 2]}`)
        const { data } = await res.json()
        setRecipe(data[0])
    }

    const handleClick = async () => {
        let steps = []
        const desObj = recipe.description[0]
        Object.keys(desObj).forEach(key => {
            steps.push(desObj[key])
        })
        const newRecipe = {
            name: recipe.name,
            ingredient: recipe.ingredient,
            time: recipe.time,
            level: recipe.level,
            tag: recipe.tag,
            description: steps,
            user: recipe.user
        }
        try {
            const res = await fetch(`http://localhost:3000/api/update/${recipe._id}`, {method: 'POST',body: JSON.stringify(newRecipe)})
            const data = await res.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Menu>
            <h1>
                hello from update
            </h1>
            <button onClick={handleClick}>change</button>
        </Menu>
    )
}