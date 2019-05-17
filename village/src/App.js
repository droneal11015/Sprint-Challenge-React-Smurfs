import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res.data);
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => console.log(err));
      
  }

  addSmurf = (smurfs) => {
    this.setState({
      smurfs: smurfs
    })
  }

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({
          smurfs: res.data
        })
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
        <nav>
          <h1>Smurfs!</h1>
          <div className="navLinks">
            <NavLink exact to='/' style={{ textDecoration: 'none', color: 'white'}}>
              The Village
            </NavLink>
            <NavLink to='/smurf-form' style={{ textDecoration: 'none', color: 'white' }}>
              Add Smurf
            </NavLink>
          </div>
        </nav>
        <Route
          path='/smurf-form'
          render={props => (
            <SmurfForm 
              {...props} onSubmit={this.addSmurf}
            />
          )}
        />
        <Route
          exact path='/'
          render={props => (
            <Smurfs
            {...props}
            smurfs={this.state.smurfs} 
            deleteSmurf={this.deleteSmurf}
            />
          )}
        />
      </div>
    );
  }
}


export default App;
