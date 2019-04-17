import React, { Component } from 'react';
import ModalPopUp from '../../shared/components/modalpopup/modalpopup'
import { connect } from "react-redux";
import GLOBAL_VARIABLES from '../../config/config';
import Navigation from './Navigation/Navigation';
import Slider from '../../components/slider/Slider';
import { getTeacher, getCurriculum } from './action';
import './Student.css';
// import TimePicker from 'react-bootstrap-time-picker';
class SearchTeacher extends Component {
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
            </div>
        );
    }
}

export default SearchTeacher;

