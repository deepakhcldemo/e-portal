import React, { Component } from "react"
import { DropdownButton, MenuItem } from 'react-bootstrap';


import "./Student.css"
// import TimePicker from 'react-bootstrap-time-picker';
class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleDropDown: false
        }
    }
    toggleDropDown = () => {
        const toggleConst = this.state.toggleDropDown;
        this.setState({
            toggleDropDown: !toggleConst
        })
    }
    render() {
        return (
            <div>
                <nav className="student-navigation">
                    <div className="row navbar-row">
                        <div className="navbar-header col-md-2">
                            <a className="navbar-brand brand-logo" href="#">WebSiteName</a>
                        </div>
                        <div className="filter-search-box col-md-6 navbar-row">
                            <input type="text" className="col-md-6 student-search-box" placeholder="Search.." />
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


export default (Student);