import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="row mt-5">
            <div className="col-md-12 text-center">
                <h1>Devs4Hire</h1>
                <p>Hire the best developers for your company</p>  
                <Link to="/developers" className="btn btn-primary btn-lg mt-4">Get started</Link> 
            </div>  
        </div>
    )
}