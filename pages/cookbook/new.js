import Menu from '../../components/Menu'
import NewRecipe from '../../components/NewRecipe'

export default function New() {
    return (
        <Menu>
            <h1 style={{textAlign: "center"}}>Nouvelle recette</h1>
            <NewRecipe />
        </Menu>
    )
}