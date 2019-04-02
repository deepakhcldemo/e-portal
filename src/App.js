import React, { Component } from 'react';
import {connect} from 'react-redux';
import ClassComponent from './components/Class/Class'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
      
      <button onClick = {this.props.openModal}> open Class</button>
      
      <ClassComponent></ClassComponent>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      modalState : state.openModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    openModal : () => dispatch({type : 'open'})
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(App);
