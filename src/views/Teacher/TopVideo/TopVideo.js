import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';
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
								<li className="card" key={index}>
									<NavLink to="" activeClassName="" exact title={videoDetail.title}>
										<img src="http://www.tompetty.com/sites/g/files/g2000007521/f/styles/photo-carousel/public/Sample-image10-highres.jpg?itok=TDZEPjP8" alt={videoDetail.title} className="img-responsive" height="130px" />
										<h2>{videoDetail.title}</h2>
										<i className="fas fa-play-circle"></i>
										<h6>2 Days Ago</h6>
									</NavLink>
									<h5>
										<StarRatingComponent
											name="rate"
											starCount={5}
											value={3}
											// onStarClick={this.onStarClick.bind(this)}
										/>
									</h5>
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
