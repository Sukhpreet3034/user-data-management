import {Link} from 'react-router-dom';
import {useRef} from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function UserForm(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setUser,setToken} = useStateContext();

    const navigate = useNavigate();

    const submitForm = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
          }
        
        axiosClient.post('/signup', payload)
        .then(({data})=> {
            navigate("/users");
            //setUser(data.user)
            //setToken(data.token)

        })
        .catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);
            }
        })
    }

    return (
        <div>
            <h1 className='title'>New User</h1>
            <div className="">
                <div className="form">
                    <form onSubmit={submitForm}>
                        { errors && <div className='alert'>
                            {Object.keys(errors).map(key=>(
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>

                        }
                        <input  ref={nameRef} type="text" placeholder="Full Name" />
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <input ref={passwordConfirmationRef} type="password" placeholder='Confirm Password' />
                        <button className="btn btn-block">Add User</button>
                    </form>
                </div>    
            </div>
        </div>
    );
}

export default UserForm;