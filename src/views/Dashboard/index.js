import React, { Component } from "react";
import Header from "../../components/layout/header/Header";

class Dashboard extends Component {
 

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header headeTitle="Dashboard" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 content-container">
          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;
