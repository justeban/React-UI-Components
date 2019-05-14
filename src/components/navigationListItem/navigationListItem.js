import React, {Component} from 'react';

// Components
import NavigationListItemOption from '../navigationListItemOption/navigationListItemOption';

//ASSETS
import reactLogo from '../../assets/640px-React-icon.png';
import downArrow from '../../assets/sort-down-solid.svg';

export default class Navigation extends Component {
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
    console.log(e.target.value);
    const searchLimit = e.target.value;
    this.props.configHandler({
      // Search Field
      [this.props.el]: {
        searchLimit
      }
    })
  }

  renderOptions = () => {
    return (
      <NavigationListItemOption>
        <ul>
          <li>
            <label htmlFor="searchLimit" >Search Limit: </label>
            <input 
              onChange={this.handleOptionOnChange}
              max="99"
              min="3"
              name="searchLimit" 
              type="number"
              value={this.props.config.searchLimit}
            />
          </li>
        </ul>
      </NavigationListItemOption>
    )
  }

  render() {
    return(
      <li key={this.props.key} onClick={() => this.props.handleOnClick(this.props.el)}>
        <img className="react-logo" alt="React Logo" src={reactLogo} />
        <h2>{this.props.el}</h2>
        <img
          onClick={this.handleArrowOnClick}
          className={this.state.pointedLeft ? 'arrow pointed-left': 'arrow'}
          alt="Icons made by Smashicons from www.flaticon.com and is licensed by Creative Commons BY 3.0"
          src={downArrow} />

          {this.state.expandOptions ? this.renderOptions() : null}
      </li>
    );
  }
}
