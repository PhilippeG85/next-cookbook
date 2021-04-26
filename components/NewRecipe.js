import { UserContext } from '../utils/userContext'
import { useState, useContext, useEffect } from 'react'
import style from '../styles/New.module.scss'
import axios from 'axios';
import Head from 'next/head'


export default function NewRecipe() {
    const user = useContext(UserContext);
    const [name, setName] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [time, setTime] = useState('');
    const [level, setLevel] = useState('');
    const [tag, setTag] = useState('');
    const [step, setStep] = useState({etapes: [' ']});
    const [image, setImage] = useState('');

    const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL
    const preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (image !== '') {
            let formData = new FormData();
            formData.append('file', image);
            formData.append("upload_preset", preset);
            axios.post(url, formData)
                .then(res => handleSubmitNext(res.data.secure_url))
                .catch(err => console.log(err))
        } else {
            const noImg = ''
            handleSubmitNext(noImg)
        }
    }

    const handleSubmitNext = async (url) => {
        const ingredientArray = ingredient.split(' ');
        const filterDescription = step.etapes.filter(step => step !== '')
        const newRecipe = {
            name,
            ingredient: ingredientArray,
            time,
            level,
            tag,
            description: filterDescription,
            user: user.email,
            imgUrl: url
        }
        try {
            const res = await fetch('http://localhost:3000/api/new', {
                method: "POST", 
                body: JSON.stringify(newRecipe)
            })
            const data = await res.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e, nam) => {
        if (e.target.name === 'ingredient') {
            setIngredient(e.target.value)
        } else if (e.target.name === 'time') {
            setTime(e.target.value)
        } else if (e.target.name === 'level') {
            setLevel(e.target.value)
        } else if (e.target.name === 'tag') {
            setTag(e.target.value)
        } else if (e.target.name === 'name') {
            setName(e.target.value)
        }
    }

    const handleStepChange = (e) => {
        let newStepArray = step.etapes
        newStepArray.splice(e.target.name, 1, e.target.value)
        setStep(prevItems => ({ ...prevItems, etapes: newStepArray}))
    }

    const displaySteps = (s, index) => {
        return (
            <div key={index} className={style.styleInput}>
                <input type='text' name={index} value={step[index]} onChange={handleStepChange} autoComplete='off' required={index === 0 ? true : false} />
                <label className={style.label}>
                    <span className={style.spanContent}>Etape {index + 1}: </span>
                </label>
            </div>
        )
    }
    const handleClick = () => {
        const newEl = step.etapes
        newEl.push('')
        setStep(prevItems => ({ ...prevItems, etapes: newEl }))
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }
    
    return (
        <div className={style.form}>
            <Head>
                <title>The Cookbook | Nouvelle Recette</title>
            </Head>
            <form onSubmit={handleSubmit} className={style.newForm}>
                <div className={style.styleInput}>
                    <input type="text" name='name' value={name} onChange={handleChange} autoComplete='off' required />
                    <label className={style.label}>
                        <span className={style.spanContent}>Nom</span>
                    </label>
                </div>
                <div className={style.styleInput}>
                    <input type="text" name='ingredient' value={ingredient} onChange={handleChange} autoComplete='off' required />
                    <label className={style.label}>
                        <span className={style.spanContent}>Ingredient</span>
                    </label>
                </div>
                <div className='timeLevel'>
                    <div className={style.styleInput}>
                        <input type='text' name='time' value={time} onChange={handleChange} autoComplete='off' required />
                        <label className={style.label}>
                            <span className={style.spanContent}>Temps</span>
                        </label>
                    </div>
                    <div className={style.styleInput}>
                        <input type='text' name='level' value={level} onChange={handleChange} autoComplete='off' required />
                        <label className={style.label}>
                            <span className={style.spanContent}>Niveau</span>
                        </label>
                    </div>
                </div>
                <div className={style.styleInput}>
                    <input type='text' name='tag' value={tag} onChange={handleChange} autoComplete='off' required />
                    <label className={style.label}>
                        <span className={style.spanContent}>Tag</span>
                    </label>
                </div>
                <div id='steps'>
                    {
                        step.etapes.map((step, i) => {
                            return (displaySteps(step, i))
                        })
                    }
                </div>
                <div className={style.newStep} onClick={handleClick}>Ajouter une étape</div>
                <div>
                    <input type='file' name='image' onChange={handleImage} />
                </div>
                <div style={{position: "relative", height: "38px"}}>
                    <input className={style.submitBtn} type='submit' value='Enregistrer' required />
                </div>
            </form>
        </div>
    )
}