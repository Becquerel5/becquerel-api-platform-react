import axios from 'axios';
import React from 'react';


function register(user) {
  return axios.post("https://localhost:8000/api/users",user); 
}



 


export default{
    register
}