import { useState } from 'react'

export default function NewImage() {
    const [image, setImage] = useState('');
    const url = process.env.CLOUDINARY_URL
    const preset = process.env.UPLOAD_PRESET

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', image);
        formData.append("upload_preset", preset);
        const res = await fetch(url, { method: 'POST', body: formData })
        const data = await res.json()
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='file' name='image' onChange={handleImage} />
            <input type='submit' value='image sub' />
        </form>
    )
}