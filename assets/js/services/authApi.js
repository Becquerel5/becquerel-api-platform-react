import axios from "axios";
import jwtDecode from "jwt-decode";


function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    
   
}

function authenticate(credentials){
 return axios
    .post('https://localhost:8000/api/login_check', credentials)
    .then(response => response.data.token)
    .then(token => {

        //save token in kocal storage windows
        window.localStorage.setItem("authToken",token);
        //telling axios that there is a default inside all our future http request
        //axios.defaults.headers["Authorization"]= "Bearer " + token;
        setAxiosToken(token);

        //return true;
       
    });
    //.catch(error => false);
 
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"]= "Bearer " + token;

}

function setup() {
    //1 voire ci ont a un token
    const token = window.localStorage.getItem("authToken");
    //2. ci le token est encore valide
    if (token) {
        const { exp: expiration } = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
    //Donner le to,en a axios
}

function isAuthenticated() {
     //1 voire ci ont a un token
     const token = window.localStorage.getItem("authToken");
      //2. ci le token est encore valide
     if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
           return true;
        }
        return false;
    }
    return false;
    
}

export default{
    authenticate,
    logout,
    setup,
    isAuthenticated
};