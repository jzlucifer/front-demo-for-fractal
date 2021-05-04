import React from 'react';

class UpdateCustomer extends React.Component {

    constructor (props) {
        super (props);
    
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            birth_date: ''
        }

        // this.baseUrl = 'http://ec2-18-216-26-41.us-east-2.compute.amazonaws.com:8080/api';
        this.baseUrl = 'http://localhost:8080/api';
    }

    
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(this.baseUrl + '/customer/' + id)
        .then(response => response.json())
        .then(customersJson => this.setState({
            first_name: customersJson.first_name,
            last_name: customersJson.last_name,
            email: customersJson.email,
            phone_number: customersJson.phone_number,
            birth_date: customersJson.birth_date
        }))
    }

    updateCustomer = async e => {
        e.preventDefault();
        let customer = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            birth_date: this.state.birth_date
        };

        customer.id = this.props.match.params.id;
        
        try{
            let config = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }

            let response = await fetch(this.baseUrl + '/customer/' + customer.id, config);
            let json = await response.json();

            console.log(json);

            this.props.history.push('/list')
        }catch(err){

        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <label className="col-md-2">First Name:</label>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="first_name" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})}/>
                    </div>
                </div>
                <div className="row">
                    <label className="col-md-2">Last Name:</label>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="last_name" value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})}/>
                    </div>
                </div>
                <div className="row">
                    <label className="col-md-2">Email:</label>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                    </div>
                </div>
                <div className="row">
                    <label className="col-md-2">Phone Number:</label>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="phone_number" value={this.state.phone_number} onChange={(e) => this.setState({phone_number: e.target.value})}/>
                    </div>
                </div>
                <div className="row">
                    <label className="col-md-2">Birth Date:</label>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="birth_date" type="date" value={this.state.birth_date} onChange={(e) => this.setState({birth_date: e.target.value})}/>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.updateCustomer}>Save</button>
                <a href="/list" className="btn btn-danger">Cancel</a>
            </div>
        );
    }
}

export default UpdateCustomer;