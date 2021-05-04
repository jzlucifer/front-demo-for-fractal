import React from 'react';

class ListCustomer extends React.Component {

    constructor (props) {
        super (props);
    
        this.state = {
          customers: [],
          isFetch: true
        }

        // this.baseUrl = 'http://ec2-18-216-26-41.us-east-2.compute.amazonaws.com:8080/api';
        this.baseUrl = 'http://localhost:8080/api';
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        fetch(this.baseUrl + '/customer/')
        .then(response => response.json())
        .then(customersJson => this.setState({customers: customersJson, isFetch: false}))
    }

    deleteCustomer(id) {
        if(window.confirm("Delete customer?")) {
            this.execDeleteCustomer(id);
        }
    }

    execDeleteCustomer = async id => {
        try{
            let config = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            let response = await fetch(this.baseUrl + '/customer/' + id, config);

            this.getList();
        }catch(err){
            console.log(err);
        }
    }

    render() {
        if(this.state.isFetch) {
            return 'Loading...';
        } else {
            return (
                <table className="table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Birth Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.birth_date}</td>
                            <td>
                                <a href={'update/' + customer.id} className="btn btn-primary">Update</a>
                                <button className="btn btn-danger" onClick={() => this.deleteCustomer(customer.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            );
        }
    }
}

export default ListCustomer;