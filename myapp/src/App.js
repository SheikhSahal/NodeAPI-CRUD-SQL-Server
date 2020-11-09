import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      Username :'',
      Email : ''
    };

  }

  componentDidMount() {
    const apiUrl = 'http://localhost:8080/';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ hits: data }));
  }

  getsinglerecrd(id){
    return  fetch('http://localhost:8080/editStudent/'+id, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      })
      .then((response) => response.json())
      .then((messages) => {
        this.setState({
          Username :messages[0].Name,
          Email : messages[0].email
        })
      });
  }
  
  deletebtn(id) {
    return fetch('http://localhost:8080/deleteStudent/' + id)
      .then((response) => {
        const apiUrl = 'http://localhost:8080/';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => this.setState({ hits: data }));
      });
  }

  NameChange(event) {
    this.setState({ Username: event.target.value });
    console.log(this.state.Username)
  }

  emailChange(event) {
    this.setState({ Username: event.target.value });
    console.log(this.state.Username)
  }

  render() {
    const { hits } = this.state;
    return (
      <div className="container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {hits.map((hit, idx) =>
              <tr key={idx}>
                <td>{hit.id}</td>
                <td>{hit.Name}</td>
                <td>{hit.email}</td>
                <td><button className="btn btn-warning" onClick={() => this.getsinglerecrd(hit.id)} data-toggle="modal" data-target="#exampleModal">Update</button></td>
                <td><button className="btn btn-danger" onClick={() => this.deletebtn(hit.id)}>Delete</button></td>
              </tr>
            )}
          </tbody>
        </table>



        <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Record</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={ this.onFormSubmit }>
                Name : <input type="text" name="Name" onChange={this.NameChange.bind(this)} className="form-control"  value={this.state.Username} /> 
                Email : <input type="text" name="Email"  className="form-control"  value={this.state.Email} />  
                </form>
                
      </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      //   <ul>
      //   {hits.map((hit, idx) =>
      //     <li key={idx}>
      //       <a>{hit.Name}</a>
      //     </li>
      //   )}
      // </ul>
    )
  }
}

export default App;
