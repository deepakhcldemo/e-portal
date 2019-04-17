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
							return (
								<li key={index}>
									<NavLink activeClassName="" exact to={videoDetail.link} title={videoDetail.title}>
										<img src={videoDetail.img} alt={videoDetail.title} className="img-responsive" height="130px" />
										<h2>{videoDetail.name}</h2>
										<i className="fas fa-play-circle"></i>
										<span className="duration">{videoDetail.duration}</span>
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
