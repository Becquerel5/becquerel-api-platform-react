import React,{useContext, useState} from 'react';
import axios from 'axios';
import AuthApi from '../services/authApi';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom/cjs/react-router-dom';

 const LoginPage = ({ history }) => {

    const {setIsAuthenticated} = useContext(AuthContext);


     const[credentials,setCredentials] = useState({
         username: "",
         password: ""
     });

     const[error,setError] = useState("");

     //gestions des champs
     const handleChange = ({currentTarget}) => {
        const {value, name} =currentTarget;
       setCredentials({...credentials, [name]: value});
     };

     //ssubmlit
     const handleSubmit = async event => {
         event.preventDefault();

         try {

            await AuthApi.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/customers");
            /*  const token = await axios
             .post('https://localhost:8000/api/login_check', credentials)
             .then(response => response.data.token);
             setError("");

             //save token in kocal storage windows
             window.localStorage.setItem("authToken",token);
             //telling axios that there is a default inside all our future http request
             axios.defaults.headers["Authorization"]= "Bearer " + token;
 */
            /*  const data = await CustomersApi.findAll();
             console.log(data); */
             
         } catch (error) {
            // console.log(error.response);
             setError("Aucun compte avec cette addresse ou mauvais mot de passe");
         }

        // console.log(credentials);

     }; 

     return (
         <>
         <h1>Connexion a l'appliation</h1>

         <form onSubmit={handleSubmit}>
            <Field 
            label="Adresse email" 
            name="username" 
            value={credentials.username} 
            onChange={handleChange} 
            placeholder="Adresse email de connexion" 
            error={error}/>
            
            <Field
                name="password"
                label="Mot de passe"
                value={credentials.password}
                onChange={handleChange}
                type="password"
                error=''
            />
             
            <br/>
            <div>
                <button type='submit' className='btn btn-success'>Connexion</button>
                <Link to="/register" className='btn btn-link'>créé un compte</Link>
            </div>
         </form>

         </>
       );
 }
  
 export default LoginPage;