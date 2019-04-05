import React, { Component } from "react"

import "./styles.css"

class Card extends Component {

  render() {
      console.log(this.props)
    const { children } = this.props.children
    return (                 
        <div className="card">
            <div className="card-body">
                {children}
            </div>
        </div>            
    );
  }
}

export default Card

