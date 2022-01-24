import React from 'react';
import { Link } from 'react-router-dom';
import { DeveloperConsumer } from "../context";
import DeveloperRow from './DeveloperRow';

export default function DeveloperList() {
    return (
        <React.Fragment>
                    <DeveloperConsumer>
                        {value => {
                            if(value.developers.length === 0) {
                                return (
                                    <div className="row mt-5">
                                        <div className="col-md-12 mt-3">
                                            <h1 className="text-center">Developers</h1>
                                            <Link to="/add" className="btn btn-success" onClick={() => value.handleDetail('delete')}>Add Developer</Link>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <p className="text-center">There are no developers in storage.</p>  
                                        </div>
                                    </div>   
                                ) 
                            }
                            else {
                                return (
                                    <div className="row mt-5">
                                        <div className="col-md-12 mt-3">
                                            <h1 className="text-center">Developers</h1>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Link to="/add" className="btn btn-success" onClick={() => value.handleDetail('delete')}>Add Developer</Link>
                                                </div>
                                                {value.selectMultipleDevelopers ? 
                                                    (
                                                        <div className="col-md-6 d-flex justify-content-end">
                                                            <button className="btn btn-primary mr-3" onClick={() => value.openModal('hire developers')}>Hire</button>
                                                            <button className="btn btn-primary" onClick={() => value.selectIndividually()}>Hire Individually</button>
                                                        </div>
                                                    ) :
                                                    (
                                                        <div className="col-md-6 d-flex justify-content-end">
                                                            <button className="btn btn-primary" onClick={() => value.selectTeam()}>Hire Team</button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <div id="successDiv" className="alert alert-success">
                                                
                                            </div>
                                            <table className="table table-dark">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Technology</th>
                                                        <th>Years of experience</th>
                                                        <th>Pay</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {value.developers.map(developer => {
                                                        return <DeveloperRow key={developer.id} developer={developer} value={value} />
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                );
                            }
                        }}
                    </DeveloperConsumer>
        </React.Fragment>
    );
}