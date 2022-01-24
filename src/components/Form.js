import React from "react";
import { DeveloperConsumer } from "../context";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';

export default function Form({ pageTitle }) {
    return (
        <DeveloperConsumer>
            {value => {
                const developerDetails = value.developerDetails;
                
                let handleSubmit = (e) => {
                    e.preventDefault();
                    
                    const id = developerDetails.length === 0 ? uuid() : developerDetails.id;
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const phone = document.getElementById('phone').value;
                    const location = document.getElementById('location').value;
                    const picture = document.getElementById('picture').value;
                    const price = document.getElementById('price').value;
                    const technology = document.getElementById('technology').value;
                    const description = document.getElementById('description').value;
                    const experience = document.getElementById('experience').value;
                    const language = document.getElementById('language').value;
                    const linkedin = document.getElementById('linkedin').value;

                    if(value.validateInput(name, email, phone, location, price, technology, experience, language)) {
                        let developer = {
                            id,
                            name,
                            email,
                            phone,
                            location,
                            picture,
                            price,
                            technology,
                            description,
                            experience,
                            language,
                            linkedin
                        };

                        if(developerDetails.length === 0) {
                            value.addDeveloper(developer);
                            value.showSuccessMessage('Successfully added the developer!');
                        }
                        else {
                            value.editDeveloper(developer);
                            value.showSuccessMessage('Successfully edited the developer!');
                        }
                        document.getElementById('form').reset();
                    }
                }

                return (
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h1 className="text-center">{pageTitle}</h1>
                            <Link to="/developers" className="btn btn-dark" onClick={() => value.handleDetail('delete')}>Back</Link>
                        </div>
                        <div className="col-md-6 mx-auto p-3">
                            <div className="card p-4">
                                <div id="alertDiv" className="alert alert-danger">

                                </div>
                                <div id="successDiv" className="alert alert-success">

                                </div>
                                <form id="form">
                                    <div className="form-group">
                                        <label>*Name</label>
                                        <input type="text" id="name" defaultValue={developerDetails.name} className="form-control" />    
                                    </div>
                                    <div className="form-group">
                                        <label>*Email</label>
                                        <input type="text" id="email" defaultValue={developerDetails.email} className="form-control" />    
                                    </div>
                                    <div className="form-group">
                                        <label>*Phone number</label>
                                        <input type="text" id="phone" defaultValue={developerDetails.phone} className="form-control" />    
                                    </div>
                                    <div className="form-group">
                                        <label>*Location</label>
                                        <input type="text" id="location" defaultValue={developerDetails.location} className="form-control" />    
                                    </div>
                                    <div className="form-group">
                                        <label>Profile picture link</label>
                                        <input type="text" id="picture" defaultValue={developerDetails.picture} className="form-control" />    
                                    </div>
                                    <div className="form-group">
                                        <label>*Price per hour</label>
                                        <input type="number" id="price" defaultValue={developerDetails.price} className="form-control" />    
                                    </div>
                                    <div className="form-group">
                                        <label>*Technology</label>
                                        <select id="technology" className="form-control">
                                            <option value="">Please select a technology</option>
                                            <option value="Javascript">Javascript</option>    
                                            <option value="Java">Java</option>    
                                            <option value=".NET">.NET</option>    
                                            <option value="Flutter">Flutter</option>    
                                            <option value="Python">Python</option>    
                                            <option value="PHP">PHP</option>    
                                        </select>    
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea id="description" defaultValue={developerDetails.description} className="form-control"></textarea>    
                                    </div>
                                    <div className="form-group">
                                        <label>*Years of experience</label>
                                        <input type="number" id="experience" defaultValue={developerDetails.experience} className="form-control" />    
                                    </div>
                                    <div className="form-group">
                                        <label>*Native language</label>
                                        <select id="language" className="form-control">
                                            <option value="">Please select a language</option>
                                            <option value="English">English</option>    
                                            <option value="Serbian">Serbian</option>    
                                            <option value="Bulgarian">Bulgarian</option>       
                                        </select>       
                                    </div>
                                    <div className="form-group">
                                        <label>Linkedin Profile Link</label>
                                        <input type="text" id="linkedin" defaultValue={developerDetails.linkedin} className="form-control" />    
                                    </div>
                                    <div className="form-group">
                                        <button className="button btn btn-primary mb-2" onClick={(e) => handleSubmit(e)}>{developerDetails.length === 0 ? 'Add' : 'Edit'}</button>
                                        <p>* - required fields</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }}
        </DeveloperConsumer>
    );
}