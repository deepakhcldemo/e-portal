import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import Classes from '../Classes/index'
import { connect } from 'react-redux';
import firebase from '../../database/firebasedb';
import classes from './index.module.css';
import { resolve } from "q";
class Dashboard extends Component {
  state = {
    classessName: []
  }
  createClass = () => {
    this.props.createClassDispatch()
  }

  componentDidMount() {
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
        console.log(this.state.classessName, 'this');
      })
    });
  }
  render() {
    const sortedNameList = this.state.classessName.reverse()
    const classesNamesList = sortedNameList.map((classesNameItem, index) => {
      console.log('classesNameItem', classesNameItem);
      if (index <= 2) {
        return (

          <div className="col-md-4">
          <div className={classes.card}>
            {classesNameItem}
            </div>
          </div>

        )
      }
    })
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header headeTitle="Dashboard" />
          </div>
        </div>
        <div className="row">
          <div className="col-3 content-container">
            <button className="btn btn-primary" onClick={this.createClass}>Create Class</button>
            <Classes></Classes>
          </div>
          <div className="col-9 content-container">
            <div className ={"row" + " " + classes.cardContainer}>
            {classesNamesList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    createClassDispatch: () => dispatch({ type: 'open' })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
