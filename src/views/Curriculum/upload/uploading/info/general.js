import React, { Component } from "react"
import { connect } from 'react-redux';

class General extends Component {

    render() {
        const { generalInfo } = this.props     
        return ( 
            <>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input value={generalInfo.title ? generalInfo.title : ''} type="text" className="form-control" id="title" aria-describedby="title" placeholder="Title" />
            </div>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <textarea class="form-control" id="desc" rows="3">{generalInfo.desc ? generalInfo.desc : ''}</textarea>            
            </div>
            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input value={generalInfo.tags ? generalInfo.tags : ''} type="text" className="form-control" id="tags" aria-describedby="tags" placeholder="Tags" />
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
  )(General);
