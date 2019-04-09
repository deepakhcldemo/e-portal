import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { connect } from "react-redux"
import {closeModalPopUp} from './modalAction';
 
 class ModalPopUp extends Component {

  constructor(props){
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onCloseModal = () => {
    this.props.closePopModal();
  }
  render() {
    const openModal = this.props.modalState
    return (
      <div>
       
        <Modal open={openModal} onClose={this.onCloseModal} center>
          
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalState: state.event.openModalForStudent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopModal: () => dispatch(closeModalPopUp())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ModalPopUp)