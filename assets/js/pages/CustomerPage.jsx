import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import FormContentLoader from '../components/loaders/FormContentLoader';
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
    const[loading, setLoading] =useState(false);



    const fetchCustomer = async id =>{
        try {
            const {firstname, lastname, email, company } = await CustomersApi.find(id);
            
            setCustomer({firstname,lastname,email,company});
            setLoading(false);
        
        } catch (error) {
           toast.error("le client n'as pas put etre charger");
            history.replace('/customers');
        }
    };

    
//charagement du customer ci besoin charger les identifiants
    useEffect( ()=>{
        if (id !== "new") {
            setLoading(true);
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
            setErrors({});
            if (editing) {
                 await CustomersApi.update(id,customer);
                    //console.log(response.data);
                toast.success("le client a bien  été modifier");

            }else{
                 await CustomersApi.create(customer);

                toast.success("le client a bien été crée");
                history.replace('/customers');
            }
        } catch ({response}) {
            const { violations }= response.data; 
           if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath,message}) =>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);

                toast.error("Des erreurs dans le formulaires");
           }
        }
    };

    return ( 
        <>
            {!editing && <h1>Creation d'un clients</h1> || <h1>Modification du client  </h1> }
            {loading && <FormContentLoader/>}
            {!loading && <form onSubmit={handleSubmit}>
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
            </form>}
        </>
     );
}
 
export default CustomerPage;