import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Header from "../../components/layout/header/Header";
import { connect } from 'react-redux';

class Classes extends Component {
  openModal = this.props.modalState;


  onOpenModal = () => {
    console.log(this.props.openModal, 'openModal');
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { modalState } = this.props;
    console.log('this.openModal in class', modalState)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header headeTitle="Classes" />
          </div>
        </div>
        <Modal open={modalState} onClose={this.props.closeModal} center>
          <h2>Create Class</h2>
          <label for="classTxt">Class Name:</label>
          <input type="text" id="classTxt" />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalState: state.openModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: 'close' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Classes);