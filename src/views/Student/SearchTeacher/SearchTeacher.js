import React, { Component } from 'react';
//import GLOBAL_VARIABLES from '../../config/config';
import Navigation from '../Navigation/Navigation';
import Select from 'react-select';
import './SearchTeacher.css';
class SearchTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            placeHolderValue : ''
        };
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption, 
            placeHolderValue : selectedOption.value
        });
        console.log(`Option selected:`, selectedOption);

    }

    render() {
        const options = [
            { value: 'Name', label: 'Name' },
            { value: 'Category', label: 'Category' },
            { value: 'Rating', label: 'Rating' }
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
                    <div className="input-group search-teacher" id="fifteenMargin">
                        <input type="text" className="form-control" placeholder={"Search for.." + this.state.placeHolderValue} name="srch-term" id="srch-term" />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchTeacher;

