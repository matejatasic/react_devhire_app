import React from "react";
import { DeveloperConsumer } from "../context";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';

export default function HireList() {
    return (
        <DeveloperConsumer>
            {value => {
                if(value.hiredDeveloperPeriods.length === 0) {
                    return (
                        <div className="row mt-5">
                            <div className="col-md-12 mt-3">
                                <h1 className="text-center">Hires</h1>
                                <Link to="/developers" className="btn btn-dark" onClick={() => value.handleDetail('delete')}>Back</Link>
                            </div>
                            <div className="col-md-12 mt-4">
                                <p className="text-center">There are no hired developers in storage.</p>  
                            </div>
                        </div>   
                    ) 
                }
                else {
                    return (
                        <div className="row mt-5">
                            <div className="col-md-12 mt-3">
                                <h1 className="text-center">Hires</h1>
                            </div>
                            <div className="col-md-12">
                                <Link to="/developers" className="btn btn-dark">Back</Link>
                            </div>
                            <div className="col-md-12 mt-4">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Start date</th>
                                            <th>End date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value.hiredDeveloperPeriods.map(hire => {
                                            return ( 
                                                <tr key={uuid()}>
                                                    <td>{hire.userId}</td>
                                                    <td>{hire.name}</td>
                                                    <td>{hire.start_date}</td>
                                                    <td>{hire.end_date}</td>
                                                </tr>    
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                }
            }}
        </DeveloperConsumer>
    )
}