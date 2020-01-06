import React, {useState} from 'react';
import classNames from 'classnames';
import * as SearchService from './api';

// SCSS
import './searchField.scss';

export default function SearchField(props) {

  const [availableWords, setAvailableWords] = useState([]);
  const [indexForActiveElement, setIndexForActiveElement] = useState(-1);
  const [query, setQuery] = useState('');
  const [searchLimit, setSearchLimit] = useState(props.config.searchLimit);
  const [exiting, setExiting] = useState(props.config.exiting || false);
  const [value, setValue] = useState(null);

  /** __EVENT HANDLERS__ **/

  // FORM EVENTS 
  const handleOnChange = (e) => {
    checkQueryAndChangeState(e.target.value);
  };

  const handleFormOnSubmit = (e) => {
    e.preventDefault();
  };
  
  const handleFormOnKeyDown = (e) => {
    // IF TAB INCREMENT INDEX
    if (e.keyCode === 9) {
      setIndexForActiveElement(indexForActiveElement + 1);
    }
    traverseAvailableWords(e.keyCode);
  };

  // AVAILABLE WORDS EVENTS
  const handleAvailableWordOnClick = (e) => {
    checkQueryAndChangeState(e.target.dataset.word);
  };

  const handleAvailableWordOnKeyDown = (e) => {
    switch (e.keyCode) {
      // ENTER
      case 13:
        checkQueryAndChangeState(e.target.dataset.word);
        break;
      // KEY DOWN
      case 40:
        traverseAvailableWords(40);
        break;
      // KEY UP
      case 38:
        traverseAvailableWords(38);
        break;
      // TAB KEY - Increment Index
      case 9:
        setIndexForActiveElement(indexForActiveElement + 1);
        break;
      default:
        return;
    }
  };

  const handleAvailableWordListOnBlur = (e) => {
    setIndexForActiveElement(-1);
  };

  // OPTIONS EVENTS
  const handleOptionsOnChange = (e) => {
    const _searchLimit = e.value;
    setSearchLimit(_searchLimit);
  };

  /** __END OF EVENT HANDLERS__ **/

  const checkQueryAndChangeState = (_query) => {
    const { availableWords: _availableWords, value: _value } = SearchService.checkTerm(_query);
    setAvailableWords(_availableWords);
    setQuery(_query);
    setValue(_value);
  };

  const traverseAvailableWords = (keyCode) => {
    const availableWordNodes = 
      document.getElementById('availableWords') 
      && document.getElementById('availableWords').children;

    let _indexForActiveElement = indexForActiveElement;

    // If DOWN ARROW pressed
    if (availableWordNodes && keyCode === 40) {
      _indexForActiveElement += 1;
      // If we are at the end of the list
      if (_indexForActiveElement > availableWordNodes.length - 1) {
        _indexForActiveElement = 0;
      }
      availableWordNodes[_indexForActiveElement].focus();
      setIndexForActiveElement(_indexForActiveElement);
    }

    // If UP ARROW pressed
    if (availableWordNodes && keyCode === 38) {
      _indexForActiveElement -= 1;
      // If we are at the top of the list
      if (_indexForActiveElement < 0) {
        _indexForActiveElement = availableWordNodes.length - 1;
      }
      availableWordNodes[_indexForActiveElement].focus();
      setIndexForActiveElement(_indexForActiveElement);
    }
  };

  const renderWordEntry = (_value = value) => (
    <div className="word-entry">
      <h4 className="word">{_value && _value.word}</h4>
      <ul className="word-defs">
        {
          _value &&
          _value.meanings.map((el, index) => (
            <li key={index}>{el.def}</li>
          ))
        }
      </ul>
    </div>
  );

  const renderAvailableWords = (_availableWords = availableWords) => (
    <ul
      onBlur={handleAvailableWordListOnBlur} 
      id="availableWords" 
      className="available-words">
      {
        _availableWords &&
        _availableWords.length > 0 &&
        _availableWords.map((el, index) => (
          index < searchLimit &&
            <li 
              // EVENT HANDLERS
              onClick={handleAvailableWordOnClick} 
              onKeyDown={handleAvailableWordOnKeyDown}
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
  );

  const renderNoAvailableWords = () => {
    return query 
      && query.length > 0 
      && !value
      && (<p className="no-available-words">
          <em>
            No Matching Words Available
          </em>
        </p>);
    };

  return (
    <section className={classNames({'search-field': true, 'exiting': exiting})}>
      <h3>Search Field</h3>
      <form onSubmit={handleFormOnSubmit}>
        <div>
          <input 
            onChange={handleOnChange} 
            onKeyDown={handleFormOnKeyDown} 
            autoComplete="off" 
            type="text" 
            name="query"
            placeholder="Start typing..."
            value={query || ''}
          />
          {
            availableWords && 
            availableWords.length > 0
            ? renderAvailableWords() 
            : renderNoAvailableWords()
          }
          </div>
      </form>
      {
        value && renderWordEntry()
      }
    </section>
  );
}