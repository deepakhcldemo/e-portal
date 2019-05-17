import React, { Component } from "react";
import { Launcher } from "react-chat-window";

import {
  getChatFromDB,
  saveIndividualChatToDB
} from "./../../database/dal/firebase/chatDal";

import { getUserProfile } from "./../../database/dal/firebase/registrationDal";

class Chat extends Component {
  state = {
    messageList: [],
    recieverData: []
  };

  componentDidMount = async () => {
    let user;
    const { data: { sId, tId } } = this.props;
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    });
    await getChatFromDB(sId, tId).onSnapshot(doc => {
      if (doc.exists && doc.data().messageList.length > 0) {
        this.setState({
          messageList: doc.data().messageList
        });
      }
    });

    const id = this.state.userDetails.role === 'Teacher' ? sId : tId;

    await getUserProfile(id).then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          user = doc.data();
          console.log("User Data information: ", user)
          if (doc.exists) {
            this.setState({
              recieverData: user
            });
          }
        });
      }
    );
  }

  onMessageWasSent = async message => {
    const { data: { sId, tId } } = this.props;
    const {
      userDetails: { userId }
    } = this.state;
    console.log(userId, sId)
    message.author = (sId === userId) ? 'me' : 'them';
    await this.setState({
      messageList: [...this.state.messageList, message]
    });
    saveIndividualChatToDB(sId, tId, this.state.messageList);
  };

  render() {
    const { data: { sId, tId } } = this.props;
    const { userDetails, recieverData } = this.state;
    //console.log("recieverData  ", recieverData);
    const name = recieverData.firstName + " " + recieverData.lastName
    //console.log(sId, tId)
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: name,
            imageUrl: recieverData.profileImage
          }}
          onMessageWasSent={this.onMessageWasSent}
          messageList={this.state.messageList}
          showEmoji
        />
      </div>
    );
  }
}

export default Chat;
