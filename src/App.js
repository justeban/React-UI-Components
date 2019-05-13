import React, {Component}  from 'react';

// SCSS
import './App.scss';

// COMPONENTS
import SearchField from './components/searchField/searchField';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      components: [
        'Search Field',
      ],
      selectedComponent: ''
    };
  }

  handleOnClick = (selectedComponent) => {
    this.setState(Object.assign({}, this.state, {selectedComponent}));
  }

  render() {
    return (
      <main>
        <section className="navigation">
          <h2>React UI Components</h2>
          <nav>
            {
              this.state.components.map((el, index) => (
                <li key={index} onClick={() => this.handleOnClick(el)}>{el}</li>
              ))
            }
          </nav>
        </section>
        <section className="component-viewer">
          { this.state.selectedComponent === 'Search Field' ? <SearchField /> : null }
        </section>
      </main>
    );
  }
}
