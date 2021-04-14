import { useContext, useEffect } from 'react'
import Menu from '../../components/Menu'
import { UserContext } from '../../utils/userContext'

export default function Cookbook() {
    const userName = useContext(UserContext);
    useEffect(() => {
        if (userName) {
            data()
        }
    }, [userName])

    const data = async () => {
        const res = await fetch(`http://localhost:3000/api/${userName.email}`)
        const {data} = await res.json()
        console.log(data)
    }
    return (
        <div>
            <Menu>
                <h1>inside Cookbook</h1>
            </Menu>
        </div>
    )
}