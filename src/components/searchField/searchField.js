import React, {Component} from 'react';
import * as SearchService from './api';

// SCSS
import './searchField.scss';

export default class SearchField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      availableWords: [],
      indexForActiveElement: -1,
      query: '',
      value: null
    } 
  }

  /** __EVENT HANDLERS__ **/

  // FORM EVENTS 
  handleOnChange = (e) => {
    this.checkQueryAndChangeState(e.target.value);
  }

  handleFormOnSubmit = (e) => {
    e.preventDefault();
  }
  
  handleFormOnKeyDown = (e) => {
    // IF TAB INCREMENT INDEX
    if (e.keyCode === 9) {
      console.log('WE GOT HERE');
      this.setState({ indexForActiveElement: this.state.indexForActiveElement + 1 });
    }
    this.traverseAvailableWords(e.keyCode);
  }

  // AVAILABLE WORDS EVENTS
  handleAvailableWordOnClick = (e) => {
    this.checkQueryAndChangeState(e.target.dataset.word);
  }

  handleAvailableWordOnKeyDown = (e) => {
    switch (e.keyCode) {
      // ENTER
      case 13:
        this.checkQueryAndChangeState(e.target.dataset.word);
        break;
      // KEY DOWN
      case 40:
        this.traverseAvailableWords(40);
        break;
      // KEY UP
      case 38:
        this.traverseAvailableWords(38);
        break;
      // TAB KEY - Increment Index
      case 9:
        this.setState({indexForActiveElement : this.state.indexForActiveElement + 1});
        break;
      default:
        return;
    }
  }

  hanleAvailableWordListOnBlur = (e) => {
    this.setState({ indexForActiveElement: -1});
  }

  /** __END OF EVENT HANDLERS__ **/

  checkQueryAndChangeState = (query) => {
    const { availableWords, value } = SearchService.checkTerm(query);
    this.setState(Object.assign({}, this.state, { query, availableWords, value }));
  }

  traverseAvailableWords = (keyCode) => {
    const availableWordNodes = 
      document.getElementById('availableWords') 
      && document.getElementById('availableWords').children;

    let indexForActiveElement = this.state.indexForActiveElement;

    // If DOWN ARROW pressed
    if (availableWordNodes && keyCode === 40) {
      indexForActiveElement += 1;
      // If we are at the end of the list
      if (indexForActiveElement > availableWordNodes.length - 1) {
        indexForActiveElement = 0;
      }
      availableWordNodes[indexForActiveElement].focus();
      this.setState(Object.assign({}, this.state, { indexForActiveElement }));
    }

    // If UP ARROW pressed
    if (availableWordNodes && keyCode === 38) {
      indexForActiveElement -= 1;
      // If we are at the top of the list
      if (indexForActiveElement < 0) {
        indexForActiveElement = availableWordNodes.length - 1;
      }
      availableWordNodes[indexForActiveElement].focus();
      this.setState(Object.assign({}, this.state, { indexForActiveElement }));
    }
  }

  renderWordEntry = (value = this.state.value) => (
    <div className="word-entry">
      <h4 className="word">{value && value.word}</h4>
      <ul className="word-defs">
        {
          value &&
          value.meanings.map((el, index) => (
            <li key={index}>{el.def}</li>
          ))
        }
      </ul>
    </div>
  )

  renderAvailableWords = (availableWords = this.state.availableWords) => (
    <ul
      onBlur={this.hanleAvailableWordListOnBlur} 
      id="availableWords" 
      className="available-words">
      {
        availableWords &&
        availableWords.length > 0 &&
        availableWords.map((el, index) => (
          index > 10 ?
            null :
            <li 
              // EVENT HANDLERS
              onClick={this.handleAvailableWordOnClick} 
              onKeyDown={this.handleAvailableWordOnKeyDown}
              // PROPS
              data-word={el}
              key={index}
              tabIndex={0} > 
              {
                el
              }
            </li>
        ))
      }
    </ul>
  )

  render() {
    return(
      <section className="search-field">
        <h3>Search Field</h3>
        <form onSubmit={this.handleFormOnSubmit}>
          <div>
            <input 
              onChange={this.handleOnChange} 
              onKeyDown={this.handleFormOnKeyDown} 
              autoComplete="off" 
              type="text" 
              name="query"
              placeholder="Start typing..."
              value={this.state.query || ''}
            />
            {
              this.state.availableWords && 
              this.state.availableWords.length > 0
              ? this.renderAvailableWords() : null
            }
            </div>
        </form>
        {
          this.state.value 
          ? this.renderWordEntry() : null
        }
      </section>
    );
  }
}