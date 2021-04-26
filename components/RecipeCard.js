import style from '../styles/RecipeCard.module.scss'
import Link from 'next/link'

export default function RecipeCard({ recipe }) {
    return (
        <Link href={`/cookbook/${recipe.name}`}>
            <a>
                <div style={{
                    backgroundImage: `linear-gradient(rgba(240,240,240,.3), rgba(240,240,240,.3)), url(${ recipe.imgUrl ? recipe.imgUrl : '/home.jpg' })` 
                    }}
                    className={style.RecipeCard}
                >
                    <div className={style.recipe}>
                        <h1>{recipe.name}</h1>
                    </div>
                </div>

            </a>
        </Link>
    )
}