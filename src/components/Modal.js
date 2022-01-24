import React from "react";
import { DeveloperConsumer } from "../context";

export default function Modal() {

    return (
        <DeveloperConsumer>
            {value => {
                let handleClick = (e) => {
                    e.preventDefault();
                    const id = e.target.classList[1];
                    const action = e.target.classList[0];

                    if(action === 'delete') {
                        value.deleteDeveloper(id);
                        value.showSuccessMessage('Successfully deleted the developer!');
                    }
                    else {
                        const start_date = document.getElementById('start_date').value;
                        const end_date = document.getElementById('end_date').value;

                        if(action === 'hireDeveloper') {    
                            if(value.validateDates(start_date, end_date, id)) {
                                value.hireDeveloper(start_date, end_date, id);
                                value.showSuccessMessage('Successfully hired the developer!');
                            }
                        }
                        else if(action === 'hireDeveloperTeam') {
                            let failedValidations = 0;
                            value.selectedDevelopersForTeam.forEach(developerID => {
                                if(!value.validateDates(start_date, end_date, developerID)) failedValidations++;
                            });

                            if(failedValidations === 0) {
                                value.selectedDevelopersForTeam.forEach(developerID => value.hireDeveloper(start_date, end_date, developerID));
                                value.closeModal();
                                value.showSuccessMessage('Successfully deleted the developer team!');
                            }
                        }
                    }
                }

                return (
                    <div className="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"></h5>
                                    <button type="button" className="close" onClick={() => value.closeModal()} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div id="alertDiv" className="alert alert-danger">

                                    </div>
                                    <div className="modal-changebale-div text-dark">
                                        <p id="modal-text"></p>
                                    </div>
                                    <button id="modal-button" onClick={(e) => handleClick(e)}>Button</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </DeveloperConsumer>
    )
}