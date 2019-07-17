import React, {useState}  from 'react';
import delay from './utils/delay';

// SCSS
import './App.scss';

// COMPONENTS
import SearchField from './components/searchField/searchField';
import SearchFieldOptions from './components/searchField/searchFieldOptions';

import PasswordStrengthMeter from './components/passwordStrengthMeter/passwordStrengthMeter';
import PasswordStrengthMeterOptions from './components/passwordStrengthMeter/passwordStrengthMeterOptions';

import DragAndDrop from './components/dragAndDrop/dragAndDrop';
import MessageAndSpinner from './components/messageAndSpinner/messageAndSpinner';

import NavigationListItem from './components/navigationListItem/navigationListItem';

export default function App (props) {

  const [components] = useState([
    'Search Field',
    'Drag and Drop',
    'Message and Spinner',
    'Password Strength Meter'
  ]);
  const [componentOptions] = useState({
    'Search Field': SearchFieldOptions,
    'Password Strength Meter': PasswordStrengthMeterOptions
  });

  const [configOptions, setConfigOptions] = useState({
    'Search Field': {
      exiting: false,
      searchLimit: 10
    },
    'Drag and Drop': {
      exiting: false
    }
  });
  const [selectedComponent, setSelectedComponent] = useState('');

  const handleOnClick = async (component, transitionTime = 500) => {

    if (selectedComponent === component) { return; }

    if (selectedComponent === '') { return setSelectedComponent(component); }

    const prevSelectedComponent = selectedComponent;
    if (prevSelectedComponent) { setConfigValue(prevSelectedComponent, {exiting: true}); }
    delay(transitionTime - 1, null, () => setConfigValue(prevSelectedComponent, {exiting: false}));
    delay(transitionTime, null, () => setSelectedComponent(component));
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
          <DragAndDrop config={configOptions['Drag and Drop']} />
        }
        {
          selectedComponent === 'Message and Spinner' &&
          <MessageAndSpinner />
        }
        {
          selectedComponent === 'Password Strength Meter' &&
          <PasswordStrengthMeter />
        }
      </section>
    </main>
  );
}
