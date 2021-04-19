import { UserContext } from '../utils/userContext'
import { useState, useContext } from 'react'
import style from '../styles/New.module.scss'


export default function NewRecipe() {
    const user = useContext(UserContext);
    const [name, setName] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [time, setTime] = useState('');
    const [level, setLevel] = useState('');
    const [tag, setTag] = useState('');
    const [step] = useState([]);
    const [num, setNum] = useState([1]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingredientArray = ingredient.split(' ');
        const newRecipe = {
            name,
            ingredient: ingredientArray,
            time,
            level,
            tag,
            description: step,
            user: user.email
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
        step.splice((e.target.name - 1), 1, e.target.value)
    }

    const displaySteps = (n, index) => {
        return (
            <div className='step-content' key={index}>
                <label>Step {n}: </label>
                <div className='style-input'>
                    <input type='text' name={`${n}`} value={step[`step_${n}`]} onChange={handleStepChange} autoComplete='off' required />
                    <label className='label'>
                    </label>
                </div>
            </div>
        );
    }
    const handleClick = () => {
        setNum(prevNum => [...prevNum, ((prevNum.length) + 1)])
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit} className={style.newForm}>
                <div className={style.styleInput}>
                    <input type="text" name='name' value={name} onChange={handleChange} autoComplete='off' required />
                    <label className={style.label}>
                        <span className={style.spanContent}>Name</span>
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
                            <span className={style.spanContent}>Time</span>
                        </label>
                    </div>
                    <div className={style.styleInput}>
                        <input type='text' name='level' value={level} onChange={handleChange} autoComplete='off' required />
                        <label className={style.label}>
                            <span className={style.spanContent}>Level</span>
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
                        num.map((n, index) => {
                            return (
                                displaySteps(n, index)
                            );
                        })
                    }
                </div>
                <input type='submit' value='Add this recipe' required />
            </form>
            <button onClick={handleClick}>add element</button>
        </div>
    )
}