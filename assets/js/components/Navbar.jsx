import React from 'react';

const Navbar = (props) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SymReact</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav me-auto">
                    
                    <li className="nav-item">
                    <a className="nav-link" href="#/customers">Clients</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#/invoices">Factures</a>
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
                    <li className="nav-item">
                        <a href='#' className='btn btn-success'>Signin!</a>&nbsp;
                    </li>
                    <li className="nav-item">
                        <a href='#' className='btn btn-primary'>Login!</a>&nbsp;
                    </li>
                    <li className="nav-item">
                        <a href='#' className='btn btn-danger'>Logout!</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;