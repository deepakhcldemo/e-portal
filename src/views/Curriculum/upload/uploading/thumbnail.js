import React, { Component } from "react"
import { connect } from 'react-redux';

class Thumbnail extends Component {

    render() {
        const { thumbnails } = this.props            
        return ( 
            <>
            { thumbnails && thumbnails.map((thumbnail, index) => (
                <img key={index} src={thumbnail.src} alt={thumbnail.alt} className="img-thumbnail" />
            ))}
            </>            
        )
    }
}

const mapStateToProps = state => {  };
const mapDispatchToProps = dispatch => {};
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Thumbnail);
