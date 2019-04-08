import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import { connect } from 'react-redux';
import firebase from '../../database/firebasedb';
import classes from './index.module.css';
import { resolve } from "q";
class Dashboard extends Component {
  state = {
    classessName: []
  }
  



 
  componentDidMount() {
    console.log('did mount')
    const tempData = [];
    const ePortalDatabase = firebase.firestore();
    ePortalDatabase.collection('class').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        tempData.push(doc.id);
      })
      const promiseData = new Promise((resolve, reject) => {
        resolve(tempData)
      })
      promiseData.then((className) => {
        this.setState({
          classessName: className
        })
      })
    });
    const promiseData = new Promise((resolve, reject) => {
      resolve(tempData)
    })
    promiseData.then((className) => {
      this.setState({
        classessName: className
      })
    })
  }

  
  render() {
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header headeTitle="Dashboard" />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <button className="btn btn-primary" onClick={this.createClass}>Create Class</button>
          </div>
          <div className="col-9">
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalSata: state.classes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createClassDispatch: () => dispatch({ type: 'open' }),
    createDeleteDispatch : () => dispatch({type : 'delete', value : 'abcd'})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
