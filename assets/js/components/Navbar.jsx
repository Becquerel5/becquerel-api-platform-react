import React, { useContext } from 'react';
import AuthApi from '../services/authApi';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = ({ history }) => {

    const { isAuthenticated,setIsAuthenticated } = useContext(AuthContext);
    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        history.push("/login");
    };

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">SymReact</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav me-auto">
                    
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/customers">Clients</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>
                    
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="text" placeholder="Search"/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>&nbsp;
                </form>

                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated &&  (
                    <>
                        <li className="nav-item">
                            <NavLink to='/register' className='btn btn-success'>Signin!</NavLink>&nbsp;
                        </li>
                        <li className="nav-item">
                            <NavLink to='/login' className='btn btn-primary'>Login!</NavLink>&nbsp;
                        </li>
                    </>
                    ))  || (
                    
                    <li className="nav-item">
                        <button onClick={handleLogout} className='btn btn-danger'>Logout!</button>
                    </li>
                    )}
                </ul>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;