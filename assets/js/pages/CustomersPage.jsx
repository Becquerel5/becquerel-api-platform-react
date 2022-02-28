import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import CustomersApi from '../services/CustomersApi';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';


const CustomersPage = props => {

    const[ customers, setCustomers]= useState([]);
    const[currentPage, setCurrentPage]=useState(1);
    const[search, setSearch] = useState("");
    const[loading, setLoading] =useState(true);

    const fetchCustomers = async()=>{
        try{
            const data = await CustomersApi.findAll()
            setCustomers(data);
            setLoading(false);
        }catch(error){
           toast.error("impossible de charger les clients");
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
           await CustomersApi.delete(id);
           toast.success("Le client a bien été supprimer");
        }catch(error){
            setCustomers(originalCustomers);
            toast.error("la suppression du clients n'as pas fonctionner");
          
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
        <div className="mb-5 d-flex justify-content-between align-items-center">
            <h1>Liste des clients</h1> 
            <Link to="/customers/new" className="btn btn-primary"> Créer un clients</Link>
        </div>

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
            {!loading && <tbody>
                {paginatedCustomers.map(customer => 
                    <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>
                        <Link to={"/customers/" +customer.id} >{customer.firstname} {customer.lastname}</Link>
                        {/* <a href='#'>{customer.firstname} {customer.lastname}</a> */}
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

                   
                    <Link to={"/customers/" +customer.id} className="btn btn-sm btn-primary">Modifier</Link>&nbsp;
                        <button
                        onClick={()=> handleDelete(customer.id)}
                         disabled={customer.invoices.length > 0}
                         className='btn btn-sm btn-danger'>Supprimer
                         </button>
                    </td>
                </tr>)}
                
            </tbody>}
        </table>
        {loading && <TableLoader/>}

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