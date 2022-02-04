import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import CustomersApi from '../services/CustomersApi';

const CustomersPage = props => {

    const[ customers, setCustomers]= useState([]);
    const[currentPage, setCurrentPage]=useState(1);
    const[search, setSearch] = useState("");

    const fetchCustomers = async()=>{
        try{
            const data = await CustomersApi.findAll()
            setCustomers(data);
        }catch(error){
            console.error(error.response);
        }
    }
    useEffect(() => {
        fetchCustomers();
    },[]);

   /*  //2 method to get
    useEffect(() => {
        CustomersApi.findAll()
            .then(data => setCustomers(data))
            .catch(error => console.error(error.response));
    },[]); */


    const handleDelete = async (id) =>{
       // console.log(id);

        const originalCustomers = [...customers];

        //1 optimistic
            //setCustomers(customers.filter(customer => customer.id !== id));
        setCustomers(customers.filter(customer => customer.id !== id));
        //2 pesimistic
        try{
           await CustomersApi.delete(id)
        }catch(error){
            setCustomers(originalCustomers);
          
        }
       /*  //2 method to delete
          CustomersApi.delete(id)
        .then(response =>console.log(ok))
        .catch(error => {
            setCustomers(originalCustomers);
            console.log(error.response)
            }); */
    };

    const handleChangePage = (page) =>{
        setCurrentPage(page);
    };


    
    //console.log(pages);
    //start
    /* const start = (currentPage * itemsPerPage) - itemsPerPage;
    const paginatedCustomers = customers.slice(start, start + itemsPerPage); */
    

    const handleSearch = event => {
        const value= event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }



    const itemsPerPage=10;

    const filteredCustomers = customers.filter(
        c => 
        c.firstname.toLowerCase().includes(search.toLowerCase()) ||
        c.lastname.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) || 
        c.company?.toLowerCase().includes(search.toLowerCase()) 
        );

    /* const filteredCustomers = customers.filter(
        //console.log("hi")
        ); */

    const paginatedCustomers = 
    //filteredCustomers.length > itemsPerPage ?
    Pagination.getData(filteredCustomers,currentPage,itemsPerPage);
   // : filteredCustomers;

    return ( 
     <>
         <h1>Liste customer</h1> 
         <div className='form-group'>
            {/* <input type="text"  onChange={handleSearch} value={search} className='form-control' placeholder='Rechercher...'/> */}
            <input type="text"  onChange={handleSearch} value={search} className='form-control' placeholder='Rechercher...'/>
         </div>
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Client</th> 
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className='text-center'>Factures</th>
                    <th className='text-center'>Montant Total</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {paginatedCustomers.map(customer => 
                    <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>
                        <a href='#'>{customer.firstname} {customer.lastname}</a>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className='text-center'>
                        <span className="btn btn-primary">
                        {customer.invoices.length}
                        </span>
                    </td>
                    <td className='text-center'>{customer.totalAmount.toLocaleString()}$</td>
                    <td>
                        <button
                        onClick={()=> handleDelete(customer.id)}
                         disabled={customer.invoices.length > 0}
                         className='btn btn-sm btn-danger'>Supprimer
                         </button>
                    </td>
                </tr>)}
                
            </tbody>
        </table>

        {itemsPerPage < filteredCustomers.length && (
        <Pagination 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        length={filteredCustomers.length}
        onPageChanged={handleChangePage}  />
        )}
        
     </>   
    
    );
}
 
export default CustomersPage;