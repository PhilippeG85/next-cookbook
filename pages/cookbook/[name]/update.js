import { UserContext } from '../../../utils/userContext'
import { useContext, useEffect, useState } from 'react'
import Menu from '../../../components/Menu'
import Link from 'next/link'
import style from '../../../styles/Update.module.scss'
import axios from 'axios'

export default function Update() {
    const userName = useContext(UserContext);
    const [ing, setIng] = useState('')
    const [recipe, setRecipe] = useState({
        name: '',
        time: '',
        level: '',
        tag: '',
        ingredient: [],
        description: [],
        imgUrl: ''
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
    const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL
    const preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (typeof recipe.imgUrl === 'string') {
            handleSubmitNext()
        } else {
            let formData = new FormData();
            formData.append('file', recipe.imgUrl);
            formData.append("upload_preset", preset);
            axios.post(url, formData)
                .then(res => handleSubmitNext(res.data.secure_url))
                .catch(err => console.log(err))
        }
    }
    
    const handleSubmitNext = async (url) => {
        const newRecipe = recipe
        const newIng = ing.split(',')
        newRecipe.ingredient = newIng
        const filterDescription = recipe.description.filter(step => step !== '')
        newRecipe.description = filterDescription
        if (url) {
            newRecipe.imgUrl = url
        }
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
        } else if (e.target.name === 'image') {
            setRecipe(prevRecipe => ({ ...prevRecipe, imgUrl: e.target.files[0] }))
        }
    }

    const handleStepChange = (e) => {
        let newSteps = recipe.description
        newSteps.splice(e.target.name, 1, e.target.value)
        setRecipe((prevRecipe) => ({ ...prevRecipe, description: newSteps}))
    }

    const displaySteps = (n, index) => {
        return (
            <div key={index} className={style.styleInput}>
                <input type='text' name={index} value={recipe.description[index]} onChange={handleStepChange} autoComplete='off' />
                <label className={style.label}>
                    <span className={style.spanContent}>Etape {index + 1}</span>
                </label>
            </div>
        );
    }

    return (
        <Menu>
            <div className={style.updatePage}>
                <Link href={`/cookbook/${recipe.name}`}><a className={style.bbtn}>Retour</a></Link>
                <h1 className={style.updateh1}>Mettre à jour: {recipe.name}</h1>
                <div className={style.formDiv}>
                    <form onSubmit={handleSubmit} className={style.newForm}>
                        <div className={style.styleInput}>
                            <input type="text" name='name' value={recipe.name} onChange={handleChange} autoComplete='off' required />
                            <label className={style.label}>
                                <span className={style.spanContent}>Nom</span>
                            </label>
                        </div>
                        <div className={style.styleInput}>
                            <input type="text" name='ingredient' value={ing} onChange={handleChange} autoComplete='off' required />
                            <label className={style.label}>
                                <span className={style.spanContent}>Ingredients</span>
                            </label>
                        </div>
                        <div className='time-level'>
                            <div className={style.styleInput}>
                                <input type='text' name='time' value={recipe.time} onChange={handleChange} autoComplete='off' required />
                                <label className={style.label}>
                                    <span className={style.spanContent}>Temps</span>
                                </label>
                            </div>
                            <div className={style.styleInput}>
                                <input type='text' name='level' value={recipe.level} onChange={handleChange} autoComplete='off' required />
                                <label className={style.label}>
                                    <span className={style.spanContent}>Niveau</span>
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
                        <div className={style.newStep} onClick={handleClick}>Ajouter une étape</div>
                        <div style={{ marginTop: "1rem" }}>
                            <input type='file' name='image' onChange={handleChange} />
                        </div>
                        <div style={{position: "relative", height: "38px"}}>
                            <input className={style.submitBtn} type='submit' value='Enregistrer' required />
                        </div>
                    </form>
                </div>
            </div>
        </Menu>
    )
}