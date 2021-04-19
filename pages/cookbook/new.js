import Menu from '../../components/Menu'
import NewRecipe from '../../components/NewRecipe'
import style from '../../styles/New.module.scss'

export default function New() {
    return (
        <Menu>
            <div className={style.addRecipeContent}>
                <h1 className={style.textCenter}>Add a new recipe to your cookbook</h1>
                <div className={style.instructionsAndForm}>
                    <div>
                        <h3>Instructions: </h3>
                        <p>First, you need to add all the ingredient for your recipe</p>
                        <p>Second, specifie the time and level to complete the recipe</p>
                        <p>Third, we need to know what this recipe mean for you</p>
                        <p>And last but not least, how do you make this bloody recipe</p>
                    </div>
                    <div className={style.flexForm}>
                        <NewRecipe />
                    </div>
                </div>
            </div>
        </Menu>
    )
}