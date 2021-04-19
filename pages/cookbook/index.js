import { useContext, useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import { UserContext } from '../../utils/userContext'
import RecipeCard from '../../components/RecipeCard'

export default function Cookbook() {
    const userName = useContext(UserContext);
    const [recipes, setRecipes] = useState([])
    
    useEffect(() => {
        if (userName) {
            data()
        }
    }, [userName])

    const data = async () => {
        const res = await fetch(`http://localhost:3000/api/${userName.email}`)
        const { data } = await res.json()
        setRecipes(data)
    }
    return (
        <div>
            <Menu>
                <div style={{ textAlign: "center" }}>
                    {recipes.map((recipe) => {
                        return <RecipeCard key={recipe.name} recipe={recipe} />
                    })}
                </div>
            </Menu>
        </div>
    )
}