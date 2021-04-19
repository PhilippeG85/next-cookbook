import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../utils/userContext'
import Menu from '../../../components/Menu'
import style from '../../../styles/Name.module.scss'
import Link from 'next/link'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Recipe() {
    const userName = useContext(UserContext);
    const [recipe, setRecipe] = useState({});
    console.log(recipe)

    useEffect(() => {
        if (userName) {
            loadData()
        }
    }, [userName])

    const loadData = async () => {
        const recipeName = window.location.pathname.split('/')
        const res = await fetch(`http://localhost:3000/api/${userName.email}/${recipeName[recipeName.length - 1]}`)
        const { data } = await res.json()
        setRecipe(data[0])
    }

    const displayIngredient = () => {
        if (recipe.ingredient) {
            return recipe.ingredient.map((ing, i) => {
                return <li key={i}>{ing}</li>
            })
        }
    }

    const handleClick = () => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            console.log('to do delete')
        }
    }

    return (
        <Menu>
            <div className={style.recipe}>
                <h1>{recipe.name}</h1>
                <div className={style.recipeIng}>
                    <div>
                        <ul>
                            {displayIngredient()}
                        </ul>
                    </div>
                    <div>
                        <p>Temps: {recipe.time}</p>
                        <p>Level: {recipe.level}</p>
                    </div>
                </div>
                <div className={style.etape}>
                    <h3>Etapes:</h3>
                </div>
                <div className={style.recipeLink}>
                    <Link href={`/cookbook/${recipe.name}/update`}>Update</Link>
                    <FontAwesomeIcon className={style.pointer} icon={faTrashAlt} onClick={handleClick} />
                </div>
            </div>
        </Menu>
    )
}
