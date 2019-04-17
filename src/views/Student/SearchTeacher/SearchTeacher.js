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
        };
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    render() {
        const options = [
            { value: 'Maths', label: 'Maths' },
            { value: 'Sport', label: 'Sport' },
            { value: 'Music', label: 'Music' }
        ];
        const { selectedOption } = this.state;
        return (
            <div>
                <div>
                    <Navigation></Navigation>
                </div>
                <div className="filter-search">
                    <div className="filter-teacher">
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div class="input-group search-teacher" id="fifteenMargin">
                        <input type="text" class="form-control" placeholder="Search" name="srch-term" id="srch-term" />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchTeacher;

