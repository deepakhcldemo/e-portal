import React, { Component } from "react";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { connect } from "react-redux";

class AboutUs extends Component {
 
  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <HeaderHome headeTitle="AboutUs" />
            </div>
            </div>
            <div className="row">
              <div className="col-12 content-container">
                About Us
            </div>
          </div>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
   
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutUs);
