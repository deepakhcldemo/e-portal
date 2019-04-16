import React, { Component } from "react"
import Select from 'react-select';
import "./Student.css"
// import TimePicker from 'react-bootstrap-time-picker';
class Student extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedOption: null,
        };
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }
    render() {
        const options = [
            { value: 'Maths', label: 'Maths' },
            { value: 'Sports', label: 'Sports' },
            { value: 'Music', label: 'Music' }
        ];
        const { selectedOption } = this.state;

        return (
            <div>
                <div className="nav-bar-wrapper">
                    <nav className="student-navigation">
                        <div className="row navbar-row">
                            <div className="navbar-header col-4 col-md-2 col-xs-2">
                                <a className="navbar-brand brand-logo" href="#">WebSiteName</a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="search-box-filter">
                    <div className="student-drop-down">
                        <Select className="subject-dropdown"
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div class="inner-addon left-addon student-search-box">
                        <i class="fa fa-search"></i>
                        <input type="text" class="form-control" />
                    </div>
                    {/* <div className="student-search-box">
                        <input type="text" placeholder="Search.." />
                    </div> */}
                </div>
            </div>
        )
    }
}


export default (Student);