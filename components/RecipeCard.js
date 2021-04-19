import style from '../styles/RecipeCard.module.scss'
import Link from 'next/link'

export default function RecipeCard({ recipe }) {
    return (
        <Link href={`/cookbook/${recipe.name}`}>
            <a>
                <div className={style.RecipeCard}>
                    <div className={style.recipe}>
                        <h1>{recipe.name}</h1>
                    </div>
                </div>

            </a>
        </Link>
    )
}