import React, {  } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Navbar1.css';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/"></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>  
                        <li className="nav-item">
                            <Link
                                className={`nav-link`}
                                to="/notes"
                            >
                                My Notes
                            </Link>
                        </li>  
                    </ul>
                </div>
            </nav>
        </div>
    );
}


export default Navbar;