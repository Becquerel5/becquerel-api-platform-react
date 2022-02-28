import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import { Link } from 'react-router-dom';
import CustomersApi from '../services/CustomersApi';
import InvoicesApi from '../services/InvoicesApi';





const InvoicePage = ({history,match}) => {

    const {id="new"} = match.params;

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [customers, setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });



    const fetchCustomers = async () =>{
        try {
            const data = await CustomersApi.findAll(); 
            setCustomers(data);

            if(!invoice.customer) setInvoice({...invoice,customer:data[0].id});

        } catch (error) {
            history.replace('/invoices');
            //notif error
            console.log(error.response)
        }
    };

    const fetchInvoice = async id =>{
        try {
          const {amount,status,customer} = await InvoicesApi.find(id);   
          setInvoice({amount,status,customer:customer.id});
        } catch (error) {
        console.log(error.response);  
        history.replace('/invoices');
        //notifi   error
        }
    };
   
    useEffect(()=>{
        fetchCustomers();
    },[]);

//recupere la facture via id
    useEffect(()=>{
        if (id !=="new") {
            setEditing(true);
            fetchInvoice(id);
        }
    },[id]);

    const handleChange = ({currentTarget}) =>{
        const {name,value} = currentTarget;
        setInvoice({...invoice, [name]: value});
    };


    const handleSubmit = async event =>{
        event.preventDefault();

       try {

        if (editing) {
            await InvoicesApi.update(id,invoice);
            //flash noti
            
        } else {
            
            await InvoicesApi.create(invoice);
            //TODO flash noti
            history.replace("/invoices");
           
        }

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
            {editing && <h1>Modifier d'une facture </h1> || <h1>Création d'une facture  </h1>}
            <form onSubmit={handleSubmit}>
                <Field 
                    name="amount"
                    type='number'
                    placeholder='Montant de la facture'
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                   
                />
                
                <Select  
                onChange={handleChange}
                name="customer" 
                label="client" 
                value={invoice.customer} 
                error={errors.customer}> 
                    {/* <option value="" disabled selected>Choisir un client</option> */}
                    {customers.map(customer =>(
                        <option key={customer.id} value={customer.id}>
                            {customer.firstname}{customer.lastname}
                        </option>
                    ))}
                   
                </Select>

                <Select 
                name="status"
                label="Statut"
                value={invoice.status}
                error={errors.status}
                onChange={handleChange}
                >
                {/* <option value="" disabled selected>Modifier le statut</option> */}
                <option value="SENT">Envoyée</option>
                <option value="PAID">Payée</option>
                <option value="CANCELLED">Annulée</option>
                

                </Select>

                <div className="mt-2 form-group">
                <button type="submit" className="btn btn-success">Enregistrer</button>
                <Link to="/invoices" className='btn btn-link'>
                    Retour au factures
                </Link>
                </div>
               
            </form>
        </>
     );
};
 
export default InvoicePage;