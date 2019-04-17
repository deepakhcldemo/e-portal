import React, { Component } from 'react';
import './modalpopup.css';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { closeModalPopUp } from './modalAction';

class ModalPopUp extends Component {
  constructor(props) {
    super(props);
  }

  onCloseModal = () => {
    this.props.closePopModal();
  };

  closeTeacherDetails = () => {
    this.onCloseModal();
  };

  render() {
    const openModal = this.props.modalState;
    return (
      <div>
        <Modal open={openModal} onClose={this.onCloseModal} center>
          <div className="header" />
          <div className="body">
            <div className="row">
              <div className="col-6">
                {' '}
                <img
                  src={this.props.teacherDetailsFromSlider.profile_image}
                  className="img-responsive teacher-details"
                />
              </div>
              <div className="col-6">
                <div className="margn-top">
                  <span>Name : </span>
                  <span>{this.props.teacherDetailsFromSlider.name}</span>
                </div>
                <div className="margn-top">
                  <span>category : </span>
                  <span>{this.props.teacherDetailsFromSlider.category}</span>
                </div>
                <div className="margn-top">
                  <span>Gender : </span>
                  <span>{this.props.teacherDetailsFromSlider.gender}</span>
                </div>
                <div className="margn-top">
                  <span>Rating : </span>
                  <StarRatingComponent
                    className="teacher-start-rating"
                    name="rate1"
                    starCount={5}
                    value={this.props.teacherDetailsFromSlider.rating}
                  />
                  <span>({this.props.teacherDetailsFromSlider.rating})</span>
                </div>
              </div>
            </div>
            <div className="teacher-details-okay margn-top">
              {' '}
              <button
                className="btn btn-primary"
                onClick={this.closeTeacherDetails}
              >
                {' '}
                Okay
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalState : state.studentReducer.studentModalState,
    teacherDetailsFromSlider: state.studentReducer.teacherDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopModal: () => dispatch(closeModalPopUp()),
    
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPopUp);
