import React from 'react';

import './navigationListItem.scss';

//ASSETS
import reactLogo from '../../assets/640px-React-icon.png';
import downArrow from '../../assets/sort-down-solid.svg';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointedLeft: true,
      expandOptions: false
    }
  }

  handleArrowOnClick = (e) => {
    this.setState({ 
      pointedLeft: !this.state.pointedLeft,
      expandOptions: !this.state.expandOptions
    });
  }

  handleOptionOnChange = (e) => {
    this.props.configHandler({
      [this.props.el]: {
        [e.target.name]: e.target.value 
      }
    })
  }

  render() {
    return(
      <li key={this.props.key} onClick={() => this.props.handleOnClick(this.props.el)}>
        <img className="react-logo" alt="React Logo" src={reactLogo} />
        <h2>{this.props.el}</h2>
          {
            this.props.options &&
            <React.Fragment>
              <img
                onClick={this.handleArrowOnClick}
                className={this.state.pointedLeft ? 'arrow pointed-left' : 'arrow'}
                alt="Icons made by Smashicons from www.flaticon.com and is licensed by Creative Commons BY 3.0"
                src={downArrow}
                />
              <this.props.options
                handleOptionOnChange={this.handleOptionOnChange}
                config={this.props.config}
                expandOptions={this.state.expandOptions}
                />
            </React.Fragment>
          }
      </li>
    );
  }
}
