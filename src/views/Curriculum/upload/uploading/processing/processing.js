import React, { Component } from "react"
import { connect } from 'react-redux';

class Processing extends Component {

    render() {
        const { progress } = this.props
        const width = {
            width: proress + '%'
        }
        return ( 
            <>
            { progress && (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={width}>{progress}%</div>
                </div>
            )}
            </>
        )
    }
}

const mapStateToProps = state => {  };
const mapDispatchToProps = dispatch => {};
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Processing);
