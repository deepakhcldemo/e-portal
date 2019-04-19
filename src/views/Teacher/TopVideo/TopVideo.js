import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './topvideo.scss'

class TopVideo extends Component {
    render = () => {
		const {heading, videoDetails} = this.props		
        return (
			<div className="card">
				<div className="card-body">
					<h4>{heading} {this.props.children && (<span className="link pull-right">{this.props.children}</span>)}</h4><hr/>
					<ul className="list-unstyled video-list-thumbs">
						{videoDetails && videoDetails.map((videoDetail,index) => {
							debugger
							return (
								<li key={index}>
									<NavLink to="" activeClassName="" exact title={videoDetail.title}>
										<img src={videoDetail.thumb} alt={videoDetail.title} className="img-responsive" height="130px" />
										<h2>{videoDetail.title}</h2>
										<i className="fas fa-play-circle"></i>
										<span className="duration"></span>
									</NavLink>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
        );
    }
}
export default TopVideo
