import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


class Like extends Component {
    state = {
        isActive: false
    }
    componentDidMount() {
        const userLike = this.props.userLike;
        this.setState({isActive: (userLike ? true: false)});
    }
    componentWillReceiveProps(nextProps) {
        // Load new data when the dataSource property changes.
        if (nextProps.userLike != this.props.userLike) {
            this.setState({isActive: (nextProps.userLike ? true: false)});
        }
    }
    render() {
        const {isDisabled, onLike, totalLike} = this.props;
        return (
            <React.Fragment>
                <button className={classnames('btn btn-transparent', {linkActive: this.state.isActive})} disabled={isDisabled} onClick={()=> onLike()}>
                    <i className="fas fa-thumbs-up" />
                    {(totalLike > 0 || totalLike === 0) && (
                        <span>{totalLike}</span>
                    )}
                </button>
            </React.Fragment>
        )
    }
}
Like.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    onLike: PropTypes.func.isRequired,
    totalLikeL: PropTypes.number.isRequired
};
export default Like;