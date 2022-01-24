import React from "react";
import { Link } from "react-router-dom";

export default function DeveloperRow({developer, value}) {
    let handleChange = (e) => {
        value.setDeveloperToTeam(e);    
    }
    return (
        <tr>
            <td>{developer.name}</td>
            <td>{developer.technology}</td>
            <td>{developer.experience} year{developer.experience === '1' ? '' : 's'}</td>
            <td>{developer.price}$</td>
                {value.selectMultipleDevelopers ? 
                    (
                        <td>
                            <input type="checkbox" id={developer.id} value={developer.id} onChange={(e) => handleChange(e)} />
                        </td>
                    ) : 
                    (
                        <td className="action-column d-flex justify-content-around">
                            <button className="btn btn-primary" onClick={() => value.openModal('hire developer', developer.id)}>Hire</button>
                            <Link to="/developer" className="btn btn-secondary" onClick={() => value.handleDetail('add', developer.id)}>View</Link>
                            <Link to="/edit" className="btn btn-success" onClick={() => value.handleDetail('add', developer.id)}>Edit</Link>
                            <button className="btn btn-danger" onClick={() => value.openModal('delete', developer.id)}>Delete</button>
                        </td>
                    )
                }
        </tr>
    )
}