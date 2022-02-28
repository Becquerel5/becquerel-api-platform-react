import axios from 'axios';
import React, { useState } from 'react';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import Field from '../components/forms/Field';
import usersApi from '../services/usersApi';


 
const RegisterPage = ({ history }) => {

    const [user,setUser]= useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors,setErrors]= useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = ({currentTarget}) =>{
        const {name,value} = currentTarget;
        setUser({...user, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = " confirmation du mot de pass n'est pas conform avec l'original";
            setErrors(apiErrors);
            return;
            
        }
                

        try {
            await usersApi.register(user); 
            setErrors({})
            //todo succes      
            history.replace('/login');    
        } catch (error) {
            const {violations} = error.response.data;
            if (violations) {
                violations.forEach(violation=>{
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
                
            }
        }
      
    }




    return ( 
        <>
           <h1>Register page</h1>
           <form onSubmit={handleSubmit}>
           <Field name='firstName' type='name' value={user.firstName}  label="prénom" error={errors.firstName} placeholder='prénom du client' onChange={handleChange}/>
           <Field name='lastName' type='name' value={user.lastName} label="nom de famille" error={errors.lastName} placeholder='nom du client'  onChange={handleChange}/>
           <Field name='email' type='email' value={user.email} label="email" error={errors.email} placeholder='email du client'  onChange={handleChange}/>
           <Field name='password' type='password' value={user.password}  label="password" error={errors.password} placeholder='mot de password'  onChange={handleChange}/>
           <Field name='passwordConfirm' type='password' value={user.passwordConfirm} label="passwordConfirm" error={errors.passwordConfirm} placeholder='confirmation du mot de passe'  onChange={handleChange}/>
           <div className="mt-2 form-group">
                <button type="submit" className="btn btn-success">Enregistrer</button> 
            <Link to="/login" className='btn btn-link'>J'ai deja un compte</Link>
            </div>


           </form>
        </>
     );
}
 
export default RegisterPage;