import React,{useEffect,useState} from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';
import moment from 'moment';
import InvoicesApi from '../services/InvoicesApi';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';

const STATUS_CLASSES = {
    PAID: "primary",
    SENT: "info",
    CANCELLED: "danger"
}

const STATUS_LABEL = {
    PAID: "Payée",
    SENT: "Envoyer",
    CANCELLED: "Annuler" 
}


const InvoicePage = props => {

    const [invoices, setInvoices] = useState([]);
    const[currentPage, setCurrentPage]=useState(1);
    const[search, setSearch] = useState("");
    const[loading, setLoading] =useState(true);


    
    const fetchInvoices = async()=>{
        try {
           // const data = await axios
            const data = await InvoicesApi.findAll()
            setInvoices(data);
            setLoading(false);
            
        } catch (error) {
            toast.error("Erreurs Lor du chargement des Factures!");
            //.then(data => setInvoices(data))
            //.catch(error => console.error(error.response));
        }
    }


    useEffect(() =>{
        fetchInvoices();
    },[]);

    const handleChangePage = (page) =>{
        setCurrentPage(page);
    };

    const handleDelete = async (id) =>{
         const originalInvoices = [...invoices];
 
         //1 optimistic
         setInvoices(invoices.filter(invoice => invoice.id !== id));
         //2 pesimistic
         try {
            await InvoicesApi.delete(id)
            toast.success("la facture a bien été supprimer");
         } catch (error) {
            toast.error("une erreur est survenue");
             setInvoices(originalInvoices);
         }
        
     };


    const handleSearch = event => {
        const value= event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }
    const itemsPerPage = 10;
    const formateDate = (str)=> moment(str).format('DD/MM/YYYY, h:mm:ss a');

    const filteredInvoices = invoices.filter(
        i => 
        i.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().includes(search.toLowerCase()) ||
        STATUS_LABEL[i.status].toLowerCase().includes(search.toLowerCase())
        );
        const paginatedInvoices = Pagination.getData(
            filteredInvoices,
            currentPage,
            itemsPerPage 
            );

    return ( 
        <>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Liste des Factures</h1> 
           <Link className='btn btn-primary' to="invoices/new">Créer une facture</Link> 
          
 
        </div>
        
            <div className='form-group'>
            <input type="text"  onChange={handleSearch} value={search} className='form-control' placeholder='Rechercher...'/>
            </div>
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Chrono/numero de facture</th>
                    <th>client</th> 
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Status</th>
                    <th/>
                </tr>
            </thead>
            {!loading && <tbody>
              {paginatedInvoices.map(invoice => 
                <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.chrono}</td>
                        <td><a href='#'>{invoice.customer.firstname} {invoice.customer.lastname}</a></td>
                        <td>{formateDate(invoice.sentAt)}</td>
                        <td>{invoice.amount.toLocaleString()} $</td>
                        <td>
                            <span className={"btn btn-" +STATUS_CLASSES[invoice.status]}>{STATUS_LABEL[invoice.status]}</span>
                        </td>
                        <td>
                            <Link to={"/invoices/" + invoice.id} className='btn btn-sm btn-primary'>Modifier </Link> &nbsp;  
                            <button
                                onClick={()=> handleDelete(invoice.id)}
                                 className='btn btn-sm btn-danger'>Supprimer
                            </button>
                        </td>
                </tr>
              
               )}
                    
                
            </tbody>}
        </table>
        {loading && <TableLoader/>}

        <Pagination 
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChanged={handleChangePage}
        length={filteredInvoices.length}
        />
        </>
     );
}
 
export default InvoicePage;