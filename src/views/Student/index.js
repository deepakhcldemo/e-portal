import React, { Component } from 'react';
import ModalPopUp from '../../shared/components/modalpopup/modalpopup'
import { connect } from "react-redux";
import GLOBAL_VARIABLES from '../../config/config';
import Navigation from './Navigation/Navigation';
import Slider from '../../components/slider/Slider';
import { getTeacher, getCurriculum } from './action';
import './Student.css';
// import TimePicker from 'react-bootstrap-time-picker';
class Student extends Component {
    constructor(props) {
        super(props);
        //this.teacherDetails = this.teacherDetails.bind(this);
        this.state = {
            selectedOption: null
        };
    }
    
    render() {
       
        const { carouselRows, teacherCarouselRows } = this.props;
        const listTop10Items = teacherCarouselRows;
        console.log('listTop10Items', listTop10Items);
        let listNewlyItems = carouselRows;
        return (
            <div>
                <ModalPopUp></ModalPopUp>
                <div>
                    <Navigation></Navigation>
                </div>
                <div className="student-notification">

                </div>
                <div className="student-tutor">
                    <Slider listTop10Items={listTop10Items}>
                        <h3 className="mt-30">{GLOBAL_VARIABLES.TOP10_TUTOR} <i className="fas fa-chevron-right"></i></h3>
                    </Slider>
                </div>

                <div className="student-tutor">
                    <Slider listNewlyItems={listNewlyItems}>
                        <h3 className="mt-30">{GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS} <i className="fas fa-chevron-right"></i></h3>
                    </Slider>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        carouselRows: state.homeReducerStore.carouselData,
        teacherCarouselRows: state.homeReducerStore.teacherCarouselData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurriculum: () => dispatch(getCurriculum()),
        getTeacher: () => dispatch(getTeacher()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Student);

