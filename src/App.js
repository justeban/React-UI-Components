import React, {Component}  from 'react';

import NavigationListItem from './components/navigationListItem/navigationListItem';

// SCSS
import './App.scss';

// COMPONENTS
import SearchField from './components/searchField/searchField';
import SearchFieldOptions from './components/searchField/searchFieldOptions';

import DragAndDrop from './components/dragAndDrop/dragAndDrop';
import MessageAndSpinner from './components/messageAndSpinner/messageAndSpinner';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      components: [
        'Search Field',
        'Drag and Drop',
        'Message and Spinner'
      ],
      componentOptions: {
        'Search Field': SearchFieldOptions
      },
      configOptions: {
        'Search Field': {
          searchLimit: 10
        },
        'Drag and Drop': {
        }
      },
      selectedComponent: ''
      
    };
  }

  configHandler = (newConfigOptions) => {
    this.setState({configOptions: newConfigOptions})
  }

  handleOnClick = (selectedComponent) => {
    this.setState({selectedComponent});
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
                  el={el}
                  handleOnClick={this.handleOnClick}
                  key={index}
                  options={this.state.componentOptions[el]}
                />
              ))
            }
          </nav>
        </section>
        <section className="component-viewer">
          { this.state.selectedComponent === 'Search Field' && 
            <SearchField config={this.state.configOptions['Search Field']} /> 
          }
          {
            this.state.selectedComponent === 'Drag and Drop' &&
            <DragAndDrop config={this.state.configOptions['Drag and Drop']} />
          }
          {
            this.state.selectedComponent === 'Message and Spinner' &&
            <MessageAndSpinner />
          }
        </section>
      </main>
    );
  }
}
