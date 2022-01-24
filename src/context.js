import React, { Component } from "react";

const DeveloperContext = React.createContext();

class DeveloperProvider extends Component {
    state = {
        developers: [],
        developerDetails: [],
        hiredDeveloperPeriods: [],
        selectMultipleDevelopers: false,
        selectedDevelopersForTeam: [],
    }
    componentDidMount() {
        this.setDevelopers();
    }
    setStateInStorage = () => {
        localStorage.setItem('state', JSON.stringify(this.state));      
    }
    validateInput = (name, email, phone, location, price, technology, years, language) => {
        let alertDiv = document.getElementById('alertDiv');
        let alerts = '';

        if(!name.trim() || !email.trim() || !phone.trim() || !location.trim() || 
        !price.trim() || !technology || !years.trim() || !language) {
            alerts += `
                <p>Please fill out all the required fields!</p>
            `;
        }
        if(!/\S+@\S+\.\S+/.test(email)) {
            alerts += `
                <p>Please enter a valid email address!</p>
            `;    
        }
        if(!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone)) {
            alerts += `
                <p>Please enter a valid 10 digit phone number!</p>
            `;    
        }
        if(parseInt(price) <= 0) {
            alerts += `
                <p>Please enter a price that is bigger than zero!</p>
            `;    
        }
        if(parseInt(years) <= 0) {
            alerts += `
                <p>Please enter a number of years of experience that is bigger than zero!</p>
            `;    
        }
        
        if(alerts === '') {
            return true;
        }
        else {
            alertDiv.innerHTML = alerts;
            alertDiv.style.display = 'block';

            setTimeout(() => {
                alertDiv.style.display = 'none';
            }, 8000);

            return false;
        }
    }
    validateDates = (start_date, end_date, id) => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        let tempHiredDevelopers = [...this.state.hiredDeveloperPeriods];

        let alertDiv = document.getElementById('alertDiv');
        let alerts = '';

        if(!start_date || !end_date) {
            alerts += '<p>Please fill out all the fields!</p>'; 
        }
        if(today >= start_date || today >= end_date) {
            alerts += '<p>Start date must be bigger and end date must be smaller than todays date!</p>';
        }
        tempHiredDevelopers = tempHiredDevelopers.filter(record => {
            if(record.userId === id) {
                //Don't return record if start date is bigger than record end date
                if(start_date > record.end_date) {
                    return false;
                }
                //Return record if start date is smaller, bigger or equal to record start date and end date is equal to or bigger
                //than record start date therefore interlaping with a period
                else if((start_date <= record.start_date || start_date >= record.start_date) && end_date >= record.start_date) {
                    return true;
                }
            }
        });
        if(tempHiredDevelopers.length > 0) {
            this.state.selectMultipleDevelopers ? 
            alerts += '<p>One or more developers are already hired for this period!</p>' : 
            alerts += '<p>A developer cannot be hired multiple times in the same period of time!</p>';    
        }

        if(alerts === '') {
            return true;
        }
        else {
            alertDiv.innerHTML = alerts;
            alertDiv.style.display = 'block';

            setTimeout(() => {
                alertDiv.style.display = 'none';
            }, 8000);

            return false;
        }
    }
    getDeveloper = (id) => {
        const developer = this.state.developers.find(dev => dev.id === id);
        return developer;
    }
    setDevelopers = () => {
        if(localStorage['state']) {
            const tempDevelopers = JSON.parse(localStorage.getItem('state'))['developers'];
            const tempDeveloperDetails = JSON.parse(localStorage.getItem('state'))['developerDetails'];
            const hiredDeveloperPeriods = JSON.parse(localStorage.getItem('state'))['hiredDeveloperPeriods'];
            const selectMultipleDevelopers = JSON.parse(localStorage.getItem('state'))['selectMultipleDevelopers'];
            
            this.setState(
                () => {
                    return {developers: tempDevelopers, developerDetails: tempDeveloperDetails, hiredDeveloperPeriods: hiredDeveloperPeriods, selectMultipleDevelopers: selectMultipleDevelopers};
                }
            );
        }
    }
    addDeveloper = (developer) => {
        this.setState(
            () => {
                return {developers: [...this.state.developers, developer]};
            },
            () => {
                this.setStateInStorage();
            }
        );
    }
    editDeveloper = (developer) => {
        let tempDevelopers = [...this.state.developers];
        const developerIndex = this.state.developers.findIndex(dev => dev.id === developer.id);
        tempDevelopers[developerIndex] = developer;
        
        this.setState(
            () => {
                return {developers: tempDevelopers, developerDetails: developer};
            },
            () => {
                this.setStateInStorage();
            }
        );

    }
    deleteDeveloper = (id) => {
        let tempDevelopers = [this.state.developers];
        let tempHiredDevelopers = this.state.hiredDeveloperPeriods;
        tempHiredDevelopers = tempHiredDevelopers.filter(hire => hire.userId !== id);

        const developer = this.getDeveloper(id);
        tempDevelopers = tempDevelopers[0].filter(item => item.id !== developer.id);

        this.setState(
            () => {
                return {developers: tempDevelopers, developerDetails: [], hiredDeveloperPeriods: tempHiredDevelopers};
            },
            () => {
                this.setStateInStorage();
                this.closeModal();
            }
        );
    }
    hireDeveloper = (start_date, end_date, id) => {
        const developer = this.getDeveloper(id);
        const hiredDeveloper = {start_date, end_date, userId: id, name: developer['name']};
        let tempDeveloperPeriods = this.state.hiredDeveloperPeriods;
        tempDeveloperPeriods.push(hiredDeveloper);
        
        this.setState(
            () => {
                return {hiredDeveloperPeriods: tempDeveloperPeriods};
            },
            () => {
                this.setStateInStorage();
            }
        );
    }
    setDeveloperToTeam = (e) => {
        let tempTeam = this.state.selectedDevelopersForTeam;
        let index = tempTeam.indexOf(e.target.value);

        if(index === -1) {
            tempTeam.push(e.target.value);
            this.setState(
                () => {
                    return {selectedDevelopersForTeam: tempTeam};
                },
            );
        }
        else {
            tempTeam.splice(index, 1);
            this.setState(
                () => {
                    return {selectedDevelopersForTeam: tempTeam};
                }
            );
        }
    }
    selectTeam = () => {
        this.setState(
            () => {
                return {selectMultipleDevelopers: true};
            },
            () => {
                this.setStateInStorage();
            }
        );
    }
    selectIndividually = () => {
        this.setState(
            () => {
                return {selectMultipleDevelopers: false};
            },
            () => {
                this.setStateInStorage();
            }
        );   
    }
    handleDetail = (action, id = 0) => {
        if(action === 'add') {
            const developer = this.getDeveloper(id);

            this.setState(
                () => {
                    return {developerDetails: developer};
                },
                () => {
                    this.setStateInStorage();
                }
            );
        }
        else {
            this.setState(
                () => {
                    return {developerDetails: []};
                },
                () => {
                    this.setStateInStorage();
                }
            )
        }
    }
    openModal = (action, id = 0) => {
        const modal = document.getElementsByClassName('modal')[0];
        const modalButton = document.getElementById('modal-button');
        modal.style.display = 'block';

        if(action === 'delete') {
            document.getElementsByClassName('modal-header')[0].classList = 'modal-header bg-danger';
            document.getElementsByClassName('modal-title')[0].textContent = 'Delete Developer';
            document.getElementsByClassName('modal-changebale-div')[0].innerHTML = '<p>Are you sure you want to delete this developer?</p>';
            modalButton.textContent = 'Delete';
            modalButton.classList = `delete ${id} btn btn-danger`;
        }
        else if(action === 'hire developer') {
            document.getElementsByClassName('modal-header')[0].classList = 'modal-header bg-primary';
            document.getElementsByClassName('modal-title')[0].textContent = 'Hire Developer';
            modalButton.textContent = 'Hire';
            modalButton.classList = `hireDeveloper ${id} btn btn-primary`;
            document.getElementsByClassName('modal-changebale-div')[0].innerHTML = `
                <div class="form-group">
                    <label>Start date</label>
                    <input type="date" class="form-control" id="start_date" />
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" class="form-control" id="end_date" />
                </div>
            `;
        }
        else if(action === 'hire developers') {
            document.getElementsByClassName('modal-header')[0].classList = 'modal-header bg-primary';
            document.getElementsByClassName('modal-title')[0].textContent = 'Hire Developer Team';
            
            if(this.state.selectedDevelopersForTeam.length === 0) {
                modalButton.style.display = 'none';
                document.getElementsByClassName('modal-changebale-div')[0].innerHTML = `<p>No developers have been selected!</p>`;
            }
            else {
                modalButton.style.display = 'block';
                modalButton.textContent = 'Hire';
                modalButton.classList = `hireDeveloperTeam btn btn-primary`;
                document.getElementsByClassName('modal-changebale-div')[0].innerHTML = `
                    <div class="form-group">
                        <label>Start date</label>
                        <input type="date" class="form-control" id="start_date" />
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="date" class="form-control" id="end_date" />
                    </div>
                `;    
            }
        }
    }
    closeModal = () => {
        const modal = document.getElementsByClassName('modal')[0];
        modal.style.display = 'none';
    }
    showSuccessMessage = (message) => {
        const successDiv = document.getElementById('successDiv');
        successDiv.style.display = 'block';
        successDiv.innerHTML = `<p>${message}</p>`;

        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 8000);
    }
    render() {
        return (
            <DeveloperContext.Provider value={{
                ...this.state,
                validateInput: this.validateInput,
                validateDates: this.validateDates,
                addDeveloper: this.addDeveloper,
                editDeveloper: this.editDeveloper,
                deleteDeveloper: this.deleteDeveloper,
                hireDeveloper: this.hireDeveloper,
                setDeveloperToTeam: this.setDeveloperToTeam,
                selectTeam: this.selectTeam,
                selectIndividually: this.selectIndividually,
                handleDetail: this.handleDetail,
                openModal: this.openModal,
                closeModal: this.closeModal,
                showSuccessMessage: this.showSuccessMessage,
            }}>
                {this.props.children}
            </DeveloperContext.Provider> 
        )
    }
}

const DeveloperConsumer = DeveloperContext.Consumer;

export { DeveloperProvider, DeveloperConsumer };