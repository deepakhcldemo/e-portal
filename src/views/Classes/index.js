import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Header from "../../components/layout/header/Header";
import { connect } from 'react-redux';


class Classes extends Component {
  openModal = this.props.modalState;


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const style = {
        backgroundColor : 'orange'
    }
    const { modalState } = this.props;
    return (
      <div className="container-fluid">
        <Modal open={modalState} onClose={this.props.closeModal} center>
          <h2>Create Class</h2>
          <form>
          <div className="form-group">
            <label htmlFor="classTxt">Class Name:</label>
            <input type="text" id="classTxt" style = {style}  />
          </div>
          </form>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalState: state.classes.openModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: 'close' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Classes);