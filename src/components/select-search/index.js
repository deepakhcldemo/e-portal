import React, { Component } from 'react';
import './style.css';
class SelectSearch extends Component {
  state = {
    options: this.props.properties.options,
    selectedValue: this.props.properties.selectedValue,
    name: this.props.name,
    searchValue: ''
  };
  timer = null;
  dropdownOpen = event => {
    this.popupPosition();
    this.closeDropdown(event);
    document.getElementById(this.props.name + '_items').style.display = 'block';
    document.getElementById(this.props.name + '_searchInput').focus();
    window.onresize = event => {
      this.popupPosition(event);
    };
    window.onscroll = event => {
      this.popupPosition(event);
    };
  };
  dropdownItemSelect = selectedValue => {
    this.setState({ selectedValue: selectedValue });
    document.getElementById(
      this.props.name + '_searchContainer'
    ).style.display = 'none';
    document.getElementById(this.props.name + '_textContainer').style.display =
      'block';
    this.props.onOptionSelect(selectedValue);
  };
  clearSearch = e => {
    this.setState({ selectedValue: '' });
    this.setState({ options: this.props.properties.options });
    document.getElementById(
      this.props.name + '_searchContainer'
    ).style.display = 'block';
    document.getElementById(this.props.name + '_searchContainer').focus();
    document.getElementById(this.props.name + '_textContainer').style.display =
      'none';
    document.getElementById(this.props.name + '_searchInput').value = '';
    document.getElementById(this.props.name + '_items').style.display = 'block';
    this.props.onOptionSelect('');
    e.persist();
  };

  filterOption = event => {
    let title = '';
    let searchValue = document.getElementById(this.props.name + '_searchInput')
      .value;
    clearTimeout(this.timer);
    if (this.props.properties.options.length > 0) {
      let filterList = this.props.properties.options.filter(item => {
        title = item.name;
        return title
          .toLocaleLowerCase()
          .startsWith(searchValue.toLocaleLowerCase());
      });
      this.setState({ options: filterList });
    }
    //}, 500);

    event.persist();
  };
  popupPosition = event => {
    var mainContainer = document.getElementsByTagName('body')[0];
    var mainContainerHeight = mainContainer.clientHeight;
    var element = document.getElementById(this.props.name + '_dropdownSearch');
    if (element) {
      var elementTopPosition = element.getBoundingClientRect().y;
      var midHeight = mainContainerHeight / 2;
      var optionsContainerHeight = this.state.options.length * 42;
      var popupContainerHeight =
        optionsContainerHeight > midHeight - 45
          ? midHeight - 45
          : optionsContainerHeight;
      var popopStartPosition =
        midHeight > elementTopPosition ? 0 : '-' + popupContainerHeight;
      document.getElementById(this.props.name + '_items').style.height =
        popupContainerHeight + 'px';
      var popopTopPosition = midHeight > elementTopPosition ? '100%' : '0px';
      document.getElementById(
        this.props.name + '_items'
      ).style.top = popopTopPosition;
      //document.getElementById(this.props.name + "_items").style.top =
      //popopStartPosition + "px";
      document.getElementById(this.props.name + '_items').style.transform =
        'translate3d(2px,' + popopStartPosition + 'px, 0px)';
    }
  };
  componentWillReceiveProps = nextProps => {
    this.setState({ selectedValue: nextProps.properties.selectedValue });
    if (nextProps.properties.selectedValue !== '') {
      document.getElementById(
        nextProps.name + '_searchContainer'
      ).style.display = 'none';
      document.getElementById(nextProps.name + '_textContainer').style.display =
        'block';
    } else {
      document.getElementById(
        nextProps.name + '_searchContainer'
      ).style.display = 'block';
      document.getElementById(nextProps.name + '_textContainer').style.display =
        'none';
    }
  };
  closeDropdown = event => {
    var dropdowns = document.getElementsByClassName('menu');
    // if (
    //   dropdowns &&
    //   dropdowns.style.display === "block" &&
    //     !event.target.matches(".searchInput")
    // ) {
    //   dropdowns.style.display = "none";
    // }
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (
        openDropdown.style.display === 'block' &&
        !event.target.matches('.searchInput')
      ) {
        openDropdown.style.display = 'none';
      }
    }
  };
  componentDidMount = () => {
    this.popupPosition();

    window.onclick = event => {
      if (
        !event.target.matches('.dropdown') &&
        !event.target.matches('.textContainer') &&
        !event.target.matches('.searchInput') &&
        !event.target.matches('.clearSearch') &&
        !event.target.matches('.dropdown-btn') &&
        !event.target.matches('.selectedItemText')
      ) {
        this.closeDropdown(event);
      }
    };
  };
  render() {
    return (
      <div
        id={this.props.name + '_dropdownSearch'}
        className="hc dropdown"
        tabIndex="0"
        onClick={event => this.dropdownOpen(event)}
        // onKeyUp={this.filterOption}
      >
        <div className="textContainer" id={this.props.name + '_textContainer'}>
          <div
            className="selectedItemText"
            id={this.props.name + '_selectedItemText'}
          >
            {this.state.selectedValue}
          </div>
          &nbsp;
          <div
            id={this.props.name + '_clearSearch'}
            className="clearSearch"
            onClick={event => {
              this.clearSearch(event);
            }}
          >
            X
          </div>
        </div>
        <div
          className="searchContainer"
          id={this.props.name + '_searchContainer'}
        >
          <input
            type="text"
            id={this.props.name + '_searchInput'}
            className="searchInput"
            onChange={this.filterOption}
            autoComplete="off"
          />
          <button
            id={this.props.name + '_dropdown-btn'}
            aria-haspopup="true"
            aria-expanded="true"
            type="button"
            className="dropdown-toggle dropdown-btn"
            onClick={event => this.dropdownOpen(event)}
          />
        </div>
        <div
          id={this.props.name + '_items'}
          className="menu"
          tabIndex="-1"
          style={{ display: 'block !important' }}
        >
          {this.state.options.map((item, key) => (
            <div
              key={item[this.props.properties.optionValueKey]}
              className="item"
              onClick={() =>
                this.dropdownItemSelect(
                  item[this.props.properties.optionValueKey]
                )
              }
            >
              {item[this.props.properties.optionDisplayNameKey]}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SelectSearch;
