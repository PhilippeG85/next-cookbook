import { UserContext } from '../../../utils/userContext'
import { useContext, useEffect, useState } from 'react'
import Menu from '../../../components/Menu'
import style from '../../../styles/Update.module.scss'

export default function Update() {
    const userName = useContext(UserContext);
    const [ing, setIng] = useState('')
    const [recipe, setRecipe] = useState({
        name: '',
        time: '',
        level: '',
        tag: '',
        ingredient: [],
        description: []
    })

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
        setIng(data[0].ingredient.join())
    }

    const handleClick = () => {
        const newEl = recipe.description
        newEl.push('')
        setRecipe(prevRecipe => ({ ...prevRecipe, description: newEl }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newRecipe = recipe
        const newIng = ing.split(',')
        newRecipe.ingredient = newIng
        const filterDescription = recipe.description.filter(step => step !== '')
        newRecipe.description = filterDescription
        try {
            const res = await fetch(`http://localhost:3000/api/update/${recipe._id}`, {method: 'POST',body: JSON.stringify(newRecipe)})
            const data = await res.json()
            window.alert('Recette actualisée')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setRecipe(prevRecipe => ({ ...prevRecipe, name: e.target.value }))
        } else if (e.target.name === 'time') {
            setRecipe(prevRecipe => ({ ...prevRecipe, time: e.target.value }))
        } else if (e.target.name === 'tag') {
            setRecipe(prevRecipe => ({ ...prevRecipe, tag: e.target.value }))
        } else if (e.target.name === 'level') {
            setRecipe(prevRecipe => ({ ...prevRecipe, level: e.target.value }))
        } else if (e.target.name === 'ingredient') {
            setIng(e.target.value)
        } 
    }

    const handleStepChange = (e) => {
        let newSteps = recipe.description
        newSteps.splice(e.target.name, 1, e.target.value)
        setRecipe((prevRecipe) => ({ ...prevRecipe, description: newSteps}))
    }

    const displaySteps = (n, index) => {
        return (
            <div className={style.stepContent} key={index}>
                <label>Step {index + 1}: </label>
                <div className={style.styleInput}>
                    <input type='text' name={index} value={recipe.description[index]} onChange={handleStepChange} autoComplete='off' />
                    <label className={style.label}>
                    </label>
                </div>
            </div>
        );
    }

    return (
        <Menu>
            <div className={style.updatePage}>
                <button onClick={handleClick}>Retour</button>
                <h1 style={{ textAlign: "center" }}>Update Recipe</h1>
                <div>
                    <form onSubmit={handleSubmit} className={style.newForm}>
                        <div className={style.styleInput}>
                            <input type="text" name='name' value={recipe.name} onChange={handleChange} autoComplete='off' required />
                            <label className={style.label}>
                                <span className={style.spanContent}>Name</span>
                            </label>
                        </div>
                        <div className={style.styleInput}>
                            <input type="text" name='ingredient' value={ing} onChange={handleChange} autoComplete='off' required />
                            <label className={style.label}>
                                <span className={style.spanContent}>Ingredient</span>
                            </label>
                        </div>
                        <div className='time-level'>
                            <div className={style.styleInput}>
                                <input type='text' name='time' value={recipe.time} onChange={handleChange} autoComplete='off' required />
                                <label className={style.label}>
                                    <span className={style.spanContent}>Time</span>
                                </label>
                            </div>
                            <div className={style.styleInput}>
                                <input type='text' name='level' value={recipe.level} onChange={handleChange} autoComplete='off' required />
                                <label className={style.label}>
                                    <span className={style.spanContent}>Level</span>
                                </label>
                            </div>
                        </div>
                        <div className={style.styleInput}>
                            <input type='text' name='tag' value={recipe.tag} onChange={handleChange} autoComplete='off' required />
                            <label className={style.label}>
                                <span className={style.spanContent}>Tag</span>
                            </label>
                        </div>
                        <div id='steps'>
                            {
                                recipe.description.map((n, index) => {
                                    return (
                                        displaySteps(n, index)
                                    );
                                })
                            }
                        </div>
                        <input type='submit' value='Update recipe' required />
                    </form>
                    <button onClick={handleClick}>add element</button>
                </div>
            </div>
        </Menu>
    )
}