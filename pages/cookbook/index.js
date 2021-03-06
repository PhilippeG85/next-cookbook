import { useContext, useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import { UserContext } from '../../utils/userContext'
import RecipeCard from '../../components/RecipeCard'
import Head from 'next/head'

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
            <Head>
                <title>The Cookbook | All Recipe</title>
            </Head>
            <Menu>
                <div style={{ textAlign: "center" }}>
                    {recipes.map((recipe) => {
                        return <RecipeCard key={recipe._id} recipe={recipe} />
                    })}
                </div>
            </Menu>
        </div>
    )
}