import axios from 'axios';
import { useState } from 'react'


export default function NewImage() {
    const [image, setImage] = useState('');
    const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL
    const preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('file', image);
        formData.append("upload_preset", preset);
        axios.post(url, formData)
            .then(res => console.log(res.data.secure_url))
            .catch(err => console.log(err))
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='file' name='image' onChange={handleImage} />
                <input type='submit' value='image sub' /> 
            </form>
        </>
    )
}