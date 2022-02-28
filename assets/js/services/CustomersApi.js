import axios from 'axios';

function findAll() {
    return axios
    
    .get("https://localhost:8000/api/customers")
    .then(response => response.data["hydra:member"]);
}

function find(id) {
    return axios
    .get('https://localhost:8000/api/customers/' +id)
    .then(response => response.data);
    
}
function deleteCustomer(id) {
    return axios
    .delete("https://localhost:8000/api/customers/" +id);
    
}

function update(id, customer) {
    return axios
    .put("https://localhost:8000/api/customers/" +id, 
    customer
    );
    
}

function create(customer) {
    return axios
    .post('https://localhost:8000/api/customers', customer);
     
}

export default{
    findAll,
    find,
    update,
    create,
    delete:deleteCustomer
}


