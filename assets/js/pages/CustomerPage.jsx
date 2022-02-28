import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import CustomersApi from '../services/CustomersApi';


const CustomerPage = ({match,history}) => {
    const { id = "new" } = match.params;


    const[customer, setCustomer] = useState({
        lastname:"",
        firstname:"",
        email:"",
        company:""
    });

    const [errors,setErrors] =useState({
        lastname:"",
        firstname:"",
        email:"",
        company:""
    });
    
    const[editing, setEditing] = useState(false);



    const fetchCustomer = async id =>{
        try {
            const {firstname, lastname, email, company } = await CustomersApi.find(id);
            
            setCustomer({firstname,lastname,email,company});
        
        } catch (error) {
            console.log(error.response);
            history.replace('/customers');
        }
    };

    
//charagement du customer ci besoin charger les identifiants
    useEffect( ()=>{
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id)
        } 
    },[id]);

    const handleChange = ({currentTarget}) =>{
        const {value,name} = currentTarget;
        setCustomer({...customer, [name]: value});
    };

    const handleSubmit = async event =>{
        event.preventDefault();
        try {
            if (editing) {
                 await CustomersApi.update(id,customer);
                    //console.log(response.data);
                //TODO : FLash succes notification

            }else{
                 await CustomersApi.create(customer);

                //TODO : FLash succes notification
                history.replace('/customers');
            }
            setErrors({});
        } catch ({response}) {
            const { violations }= response.data; 
           if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath,message}) =>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);

                //TODO : FLash succes notification
           }
        }
    };

    return ( 
        <>
            {!editing && <h1>Creation d'un clients</h1> || <h1>Modification du client  </h1> }
            <form onSubmit={handleSubmit}>
               <Field
                name='lastname' 
                label="Nom de famille" 
                placeholder='Nom de famille du client' 
                value={customer.lastname} 
                onChange={handleChange}
                error={errors.lastname}
                />
               <Field name='firstname' error={errors.firstname} label="prénom" placeholder='prénom du client' value={customer.firstname} onChange={handleChange}/>
               <Field name='email' error={errors.email} label="Email" placeholder='Email du client' value={customer.email} onChange={handleChange}/>
               <Field name='company' error={errors.company} label="Company" placeholder='Entreprise du client' value={customer.company} onChange={handleChange}/>

               <div className="mt-2 form-group">
                   <button type="submit" className="btn btn-success">Enregistrer</button> 
                   <Link to="/customers" className='btn btn-link'>Retour a la liste</Link>
               </div>
            </form>
        </>
     );
}
 
export default CustomerPage;