import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'

class UserList extends Component {
    render = () => {
        const { heading, subHeading, userList } = this.props
        return (
            <>
            <h4>{heading}</h4><hr/>
            <div className="card">
		         <div className="card-header">
		            <h4>{subHeading}</h4>
		        </div>
                <div className="users-list">
                {userList && userList.map((list,index) => {
                    return (
                        <div key={index} className="users-list-item border">
                            {list.img && (
                                <img className="users-list-item-img" src={list.img} />
                            )}
                            {!list.img && (
                                <i className="fa fa-user"></i>
                            )}                        
                            <div className="users-list-item-text">
                                <h3>
                                    <NavLink to={list.uid} exact>{list.name}</NavLink>
                                </h3>
                                <h4>{list.desc}</h4>
                                <p>{list.notification}</p>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
            </>
        );
    }
}
export default UserList
