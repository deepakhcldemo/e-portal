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
                <div className="nav-bar-wrapper">
                    <nav className="student-navigation">
                        <div className="row navbar-row">
                            <div className="navbar-header col-4 col-md-2 col-xs-2">
                                <a className="navbar-brand brand-logo" href="#">WebSiteName</a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className ="search-box-filter">
                    <input type="text" placeholder="Search.."/>
                </div>
            </div>
        )
    }
}


export default (Student);