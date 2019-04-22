import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TeacherItem from '../teacherItem/TeacherItem';
import VideoItem from '../videoItem/VideoItem';
import InfiniteScroll from 'react-infinite-scroll-component';

class ListContainer extends Component {
  state = {
    teacherList: this.props.itemList.slice(0, 10),
    noOfTeacherItems: 10
  };

  fetchNextTeacherItems = () => {
    const itemCounter = this.state.noOfTeacherItems + 10;
    const newItems = this.props.itemList.slice(
      this.state.noOfTeacherItems,
      itemCounter
    );
    const updatedTeacherList = [...this.state.teacherList, ...newItems];

    this.setState({
      teacherList: updatedTeacherList,
      noOfTeacherItems: itemCounter
    });
  };

  render() {
    const { listType, itemList } = this.props;

    // const teacherList = itemList.map((item, index) => {
    //   return (
    //     <div key={index} className="col-xs-12">
    //       <Link
    //         className="nav-link"
    //         style={{ padding: '0px' }}
    //         to={`/home/teacher/${item.userId}`}
    //         title={item.firstName}
    //       >
    //         <TeacherItem userProfile={item} />;
    //       </Link>
    //     </div>
    //   );
    // });
    const videoList = itemList.map((item, index) => {
      return (
        <div key={index} className="col-xs-12">
          <Link
            className="nav-link"
            style={{ padding: '0px' }}
            to={`/home/teacher/${item.userId}`}
            title={item.firstName}
          >
            <VideoItem videoDetails={item} />;
          </Link>
        </div>
      );
    });

    return (
      <React.Fragment>
        {listType === 'Teacher' && (
          <div className="col-12 content-container--background">
            <div style={{ background: '#FFF', textAlign: 'center' }}>
              <InfiniteScroll
                dataLength={this.state.teacherList.length}
                next={this.fetchNextTeacherItems}
                hasMore={true}
                loader={<h4>Loading...</h4>}
              >
                {this.state.teacherList.map((item, index) => (
                  <Link
                    className="nav-link"
                    style={{ padding: '0px' }}
                    to={`/home/teacher/${item.userId}`}
                    title={item.firstName}
                  >
                    <TeacherItem key={index} userProfile={item} />
                  </Link>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        )}
        {listType === 'Video' && (
          <div className="col-12 content-container--background">
            <div style={{ background: '#FFF', textAlign: 'center' }}>
              {videoList}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ListContainer;