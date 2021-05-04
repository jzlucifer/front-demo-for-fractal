import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import ListCustomer from './List-Customer';
import CreateCustomer from './Create-Customer';
import UpdateCustomer from './Update-Customer';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {

  render() {
    return (
      
      <Router>
        <div className="btn-group">
          <NavLink to="/list" className="btn btn-primary" activeClassName="active">List</NavLink>
          <NavLink to="/create" className="btn btn-primary" activeClassName="active">Create</NavLink>
        </div>
        <Switch>
          <Route path="/list" component={ListCustomer}></Route>
          <Route path="/create" component={CreateCustomer}></Route>
          <Route path="/update/:id" component={UpdateCustomer}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
