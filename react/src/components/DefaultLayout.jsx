import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

function DefaultLayout(){
    const {user,token, setUser,setToken} = useStateContext()

    if(!token)
    {
        return <Navigate to="/login/" />
    }

    const logout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
        .then(()=>{
            setUser({})
            setToken(null)
        })
    }

    useEffect(()=> {
        axiosClient.get('/user')
        .then(({data}) => {
            //console.log(data);
            setUser(data);
        })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard" >Dashboard</Link>
                <Link to='/users' >Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div></div>
                    <div>{user.name}
                        <a  onClick={logout} className="btn-logout" href="#">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;