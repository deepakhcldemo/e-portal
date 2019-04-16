import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'

class TopVideo extends Component {
    render = () => {
		const {heading, videoDetails} = this.props
        return (
			<>
			<h4>{heading}</h4><hr/>
			<ul class="list-unstyled video-list-thumbs">
				{videoDetails && videoDetails.map((videoDetail,index) => {
					return (
						<li key={index} class="col-sm-4 col-xs-6">
							<NavLink activeClassName="" exact to={videoDetail.link} title={videoDetail.title}>
								<img src={videoDetail.img} alt={videoDetail.title} class="img-responsive" height="130px" />
								<h2>{videoDetail.name}</h2>
								<span class="glyphicon glyphicon-play-circle"></span>
								<span class="duration">{videoDetail.duration}</span>
							</NavLink>
						</li>
					)
				})}
            </ul>
			</>
        );
    }
}
export default TopVideo
