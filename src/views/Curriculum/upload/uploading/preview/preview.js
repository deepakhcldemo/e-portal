import React, { Component } from "react"
import { connect } from 'react-redux';

class Preview extends Component {

    render() {
        const { afterPreview } = this.props            
        return (
            <>         
            { afterPreview && (
                <a src={afterPreview} href="#" target="_blank">
                    <img src={afterPreview} alt={afterPreview} className="img-thumbnail" />
                </a>
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
  )(Preview);
