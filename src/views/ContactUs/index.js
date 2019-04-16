import React, { Component } from "react";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { connect } from "react-redux";


class ContactUs extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <HeaderHome headeTitle="ContactUs" />
          </div>
          <div className="col-12">
            Contact Us
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
)(ContactUs);
