import React from "react";
import { DeveloperConsumer } from "../context";
import { Link } from "react-router-dom";

export default function DeveloperDetails() {
    return (
        <DeveloperConsumer>
            {value => {
                const developerDetails = value.developerDetails;
                return (
                    <div className="row my-5">
                        <div className="col-md-12">
                            <h1 className="text-center">Developer</h1>
                            <Link to="/developers" className="btn btn-dark" onClick={() => value.handleDetail('delete')}>Back</Link>
                        </div>
                        <div className="col-md-12">
                            <img src={developerDetails.picture ? developerDetails.picture : '/default-avatar.png'} alt="avatar" />
                        </div>
                        <div className="col-md-5 mx-auto">
                            <h2 className="text-center">Details</h2>
                            <p>Name: {developerDetails.name}</p>
                            <p>Email: {developerDetails.email}</p>
                            <p>Phone number: {developerDetails.phone}</p>
                            <p>Location: {developerDetails.location}</p>
                            <p>Price per hour: {developerDetails.price}$</p>
                            <p>Technology: {developerDetails.technology}</p>
                            <p>Description: {developerDetails.description ? developerDetails.description : 'No description'}</p>
                            <p>Years of experience: {developerDetails.experience}</p>
                            <p>Native language: {developerDetails.language}</p>
                            <p>Linkedin profile: {developerDetails.linkedin ? developerDetails.linkedin : 'No Linkedin'}</p>
                        </div>
                    </div>
                );
            }}
        </DeveloperConsumer>
    )
}