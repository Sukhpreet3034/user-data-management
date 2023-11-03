import axiosClient from "../axios-client";
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";


function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inc, setInc]  = useState(1);

    useEffect(
        () => {
            getUsers();
        }, []
    )

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
        .then(({data}) => {
            setLoading(false)
            //console.log(data)
            setUsers(data.data)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    const deleteuser = (u) => {
        if(window.confirm('Are you sure you want to delete this user?'))
        {
            axiosClient.delete(`/users/${u.id}`)
            .then(() => {
                getUsers();
            })
        }
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'space-between',alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to="/users/new"  className="btn-add">Add New User</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    { loading &&
                    <tbody>
                        <tr>
                        <td colSpan='5' className="text-center">
                            Loading
                        </td>
                        </tr>
                    </tbody>
                    }
                    { !loading &&
                    <tbody>

                        {users.map((u,index) => (
                            <tr>
                                <td>{index+1}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <button className="btn-delete" onClick={ev=>deleteuser(u)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                    }
                </table>
            </div>
        </div>
    );
}

export default Users;