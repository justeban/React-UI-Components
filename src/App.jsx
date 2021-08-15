import React, {useState}  from 'react';
import delay from './utils/delay';

// SCSS
import './App.scss';

// COMPONENTS
import {
  Component as SearchField, 
  ComponentOptions as SearchFieldOptions
} from './components/searchField';

import {
  Component as PasswordStrengthMeter,
  ComponentOptions as PasswordStrengthMeterOptions
 } from './components/passwordStrengthMeter';

import {
  Component as DragAndDrop,
  Provider,
  initialState,
  reducers
} from './components/dragAndDrop';

import {Component as MessageAndSpinner} from './components/messageAndSpinner';
import NavigationListItem from './components/navigationListItem/navigationListItem';

export default function App () {
  // STATE

  const [components] = useState([
    'Drag and Drop',
    'Message and Spinner',
    'Password Strength Meter',
    'Search Field'
  ]);
  const [componentOptions] = useState({
    'Password Strength Meter': PasswordStrengthMeterOptions,
    'Search Field': SearchFieldOptions
  });

  const [configOptions, setConfigOptions] = useState({
    'Drag and Drop': {
      exiting: false
    },
    'Message and Spinner': {
      exiting: false
    },
    'Password Strength Meter': {
      rules: {
        'At Least One Capital Letter': {
          regex: '[A-Z]'
        },
        'At Least One Number': {
          regex: '\\d'
        },
        'A Special Character, like !,?,@, etc': {
          regex: '[!@#\\$%\\^\\&*\\)\\(+=._-]+'
        }
      },
      exiting: false
    },
    'Search Field': {
      exiting: false,
      searchLimit: 10
    }
  });
  const [selectedComponent, setSelectedComponent] = useState('');

  // EVENT HANDLERS

  const handleOnClick = async (component, transitionTime = 200) => {
    if (selectedComponent === component) {
      return;
    } else if (selectedComponent === '') {
      return setSelectedComponent(component);
    } else {
      setConfigValue(selectedComponent, {exiting: true});
      delay(transitionTime - 1, null, () => setConfigValue(selectedComponent, {exiting: false}));
      delay(transitionTime, null, () => setSelectedComponent(component));
    }
  };

  const setConfigValue = (component, newProp) => {
    const newConfig = {
      ...configOptions,
      [component]: {
        ...configOptions[component],
        ...newProp
      }
    };
    setConfigOptions(newConfig);
  };

  return (
    <main>
      <section className="navigation">
        <h1>React UI Components</h1>
        <nav>
          {
            components.map((el, index) => (
              <NavigationListItem
                configHandler={setConfigValue}
                config={configOptions[el]}
                el={el}
                handleOnClick={handleOnClick}
                key={index}
                options={componentOptions[el]}
                selectedComponent={selectedComponent}
              />
            ))
          }
        </nav>
      </section>
      <section className="component-viewer">
        {
        selectedComponent === 'Search Field' &&
        <SearchField config={configOptions['Search Field']} />
        }
        {
          selectedComponent === 'Drag and Drop' &&
          <Provider initialState={initialState} reducers={reducers}>
            <DragAndDrop config={configOptions['Drag and Drop']} />
          </Provider>
        }
        {
          selectedComponent === 'Message and Spinner' &&
          <MessageAndSpinner config={configOptions['Message and Spinner']} />
        }
        {
          selectedComponent === 'Password Strength Meter' &&
          <PasswordStrengthMeter config={configOptions['Password Strength Meter']}/>
        }
      </section>
    </main>
  );
}
