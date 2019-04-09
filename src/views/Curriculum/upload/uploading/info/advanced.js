import React, { Component } from "react"
import { connect } from 'react-redux';

class Advanced extends Component {

    render() {
        const { advancedInfo } = this.props     
        return ( 
            <>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="rating" />
                <label className="form-check-label" for="rating">
                
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="like" />
                <label className="form-check-label" for="like">
                Default checkbox
                </label>
            </div>                        
            </>
        )
    }
}

const mapStateToProps = state => {  };
const mapDispatchToProps = dispatch => {};
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Advanced);
