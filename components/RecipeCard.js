import style from '../styles/RecipeCard.module.scss'

export default function RecipeCard({ recipe }) {
    return (
        <div className={style.RecipeCard}>
            <h1>{recipe.name}</h1>
        </div>
    )
}