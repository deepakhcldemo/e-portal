import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import CommentItem from "./CommentItem";
import TextArea from '../../shared/components/calendar-modal/helper/textArea';
import { saveCommentDetails } from '../../database/dal/firebase/commentDal';
import './CommentItem.css'

class Comment extends Component {
  state = {
    message: '',
    errors: {},
    isFocus: false
  };
 

  handleChange = ({ currentTarget: input }) => {
    this.setState({ [input.name]: input.value });
  };

  handleSubmit = e => {
    e.preventDefault();  
    
    if(this.state.message.trim()){    
      const loggedInUSer = JSON.parse(localStorage.getItem('user'));
      if (loggedInUSer) {
        const commentDetails = {
          created_date: new Date(),
          comment: this.state.message,
          user_id: loggedInUSer.user.uid,
          feedback_to: this.props.teacherId,
          like: 0,
          unlike: 0
        };
        saveCommentDetails({
          ...commentDetails
        }).then(() => {
          this.setState({ message:'' });
          toastr.success('Comment saved successfully.');
      },error=>{
        toastr.error(error.message);
      });
      }
    }
  };

  render() {
    const { commentRows, loggedInUser, isFocus } = this.props;
    const noOfComment = commentRows.length;
    return (
      <React.Fragment>
        <div className="comments-section">
          <div className="text-field-section">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="comment-thread-element">
                    <div className="author-thumbnail">
                      {loggedInUser && 
                      <img
                        src={loggedInUser.profileImage}
                        alt={loggedInUser.firstName + ' ' + loggedInUser.lastName}
                        title={loggedInUser.firstName + ' ' + loggedInUser.lastName}
                      className="profile-img"/>
                      } 
                    </div>
                    <form style={{width:"100%"}}>
                      <div className="comments-input">                        
                        <TextArea
                          value={this.state.message}
                          onChangeHandle={this.handleChange}
                          name="message"
                          className="auto-input form-control"
                          errorMessage={this.state.errors.message}
                          placeholder="Add a comment"
                          rows="2"
                          style={{margin: 'auto', width:'100%'}}
                          isFocus={isFocus}
                          ref={this.textInput}/>
                      </div>
                      
                      <div className="total-comments comment-btn">
                        <button type="button" className="btn btn-success"
                          data-dismiss="modal" onClick={this.handleSubmit}>
                          Submit
                        </button>                      
                      </div>                  
                    </form>                   
                    
                  </div>
                  <div className="comments-hdr-section">
                    <div className="no-thumb">&nbsp;</div>
                    <div className="comments-count">
                    <span className="count">{ noOfComment } </span>
                    <span className="count-text">{ noOfComment && 'Comments' }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        {noOfComment > 0 && (          
          <div className="container">
            <div className="row">
              <div className="col-12">
                <CommentItem commentDetails={commentRows} />
              </div>
            </div>
          </div>          
        )}
        </div>
      </React.Fragment>
    );
  }
}

export default Comment;
