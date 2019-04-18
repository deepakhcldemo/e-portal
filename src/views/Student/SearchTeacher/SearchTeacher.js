import React, { Component } from 'react';
//import GLOBAL_VARIABLES from '../../config/config';

import {getTeachersBasedOnCateogy} from './searchTeacherAction';
import Navigation from '../Navigation/Navigation';
import { connect } from "react-redux";
import Select from 'react-select';
import './SearchTeacher.css';
class SearchTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            placeHolderValue : ''
        };
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
       // this.props.getTeachersBasedOnCateogy();
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption, 
            placeHolderValue : selectedOption.value
        });
        debugger
        this.props.getTeachersBasedOnCateogy(selectedOption.value);

    }

    render() {
        const options = [
            { value: 'Name', label: 'Name' },
            { value: 'Role', label: 'Role' },
            { value: 'Location', label: 'Location' },
            { value: 'Mobile Number', label: 'Mobile Number' },
            { value: 'Email', label: 'Email' }
        ];
        const { selectedOption } = this.state;
        return (
            <div>
                <div>
                    <Navigation></Navigation>
                </div>
                <div className="filter-search">
                    
                    <div className="filter-teacher">
                    <span>Filter By Category :</span>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div className="input-group search-teacher">
                        <input type="text" className="form-control" placeholder={"Search for.." + this.state.placeHolderValue} name="srch-term" id="srch-term" />
                    </div>

                    <div className="input-group chat-btn" >
                        <input type="button" className="btn btn-success" value ="Initiate Chat"/> 
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      modalSata: state.classes,
      carouselRows: state.carouselStore.carouselData,
    };
  };
  
  const mapDispatchToProps = dispatch => {
      debugger
    return {
        getTeachersBasedOnCateogy: (selectedValue) => dispatch(getTeachersBasedOnCateogy()),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchTeacher);


