import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Switch, Route, withRouter, Redirect } from 'react-router-dom';

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import CustomersPage from './js/pages/CustomersPage';
import InvoicesPage from './js/pages/InvoicesPage';
import LoginPage from './js/pages/LoginPage';
import AuthApi from './js/services/authApi';
import AuthContext from './js/contexts/AuthContext'
import PrivateRoute from './js/components/PrivateRoute';
import CustomerPage from './js/pages/CustomerPage';
import InvoicePage from './js/pages/InvoicePage';
import RegisterPage from './js/pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





console.log("Hello from  Donfack.Becquerel Symfony-React CRM ");
AuthApi.setup();




const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());

    const NavbarWithRouter = withRouter(Navbar);

  

    return (
    <AuthContext.Provider value={{
        isAuthenticated,
        setIsAuthenticated
    }}>
        <HashRouter>
            <NavbarWithRouter/> 
            
                <main className='container pt-5'>
                    
                        <Switch>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />

                            <PrivateRoute path="/invoices/:id" component={InvoicePage}/>
                            <PrivateRoute path="/invoices" component={InvoicesPage}/>

                            <PrivateRoute path="/customers/:id" component={CustomerPage}/>
                            <PrivateRoute path="/customers" component={CustomersPage}/>
                            <Route path="/" component={HomePage}/>

                        </Switch>
                </main>

            </HashRouter>
            <ToastContainer position={toast.POSITION.TOP_RIGHT}/>

    </AuthContext.Provider>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>,rootElement);