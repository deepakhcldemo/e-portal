import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import './index.css';
class Avatar extends Component {
  state = {
    loginUser: this.props.user
  };
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle >
        <i className="fa fa-user">
          
 
        </i> </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Avatar;
