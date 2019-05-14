import React, {Component}  from 'react';

import NavigationListItem from './components/navigationListItem/navigationListItem';

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
      selectedComponent: '',
      configOptions: {
        'Search Field': {
          searchLimit: 10
        }
      }
    };
  }

  configHandler = (newConfigOptions) => {
    console.log({newConfigOptions});
    this.setState({configOptions: newConfigOptions})
  }

  handleOnClick = (selectedComponent) => {
    this.setState(Object.assign({}, this.state, {selectedComponent}));
  }

  render() {
    return (
      <main>
        <section className="navigation">
          <h1>React UI Components</h1>
          <nav>
            {
              this.state.components.map((el, index) => (
                <NavigationListItem
                  configHandler={this.configHandler}
                  config={this.state.configOptions[el]}
                  key={index}
                  el={el}
                  handleOnClick={this.handleOnClick}
                />
              ))
            }
          </nav>
        </section>
        <section className="component-viewer">
          { this.state.selectedComponent === 'Search Field' ? 
            <SearchField config={this.state.configOptions['Search Field']} /> 
            : null
          }
        </section>
      </main>
    );
  }
}
