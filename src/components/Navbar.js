import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/developers" className="navbar-brand ml-3">DEVS4HIRE</Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/developers" className="nav-link">Developers</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/hires" className="nav-link">Hires</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}