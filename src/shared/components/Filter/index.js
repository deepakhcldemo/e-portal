import React, { Component } from 'react'

class Filter extends Component {

    filter = (event) => {
        let updatedList = this.props.content.filter( item => {            
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase() 
            ) !== -1
        })
        this.props.filterContent(updatedList)
    }
    
    render = () => {  
              
        return (
            <div className="card">
                <input type="text" className="form-control" placeholder="Search by Title" onChange={this.filter}/>
            </div>
        );
    }
}
export default Filter
