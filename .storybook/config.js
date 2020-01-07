import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faEye, faEyeSlash);

const divStyle = {
  background: '#f7f7f7',
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
  height: '95vh',
  padding: '2em',
};

addDecorator(storyFn => <div style={divStyle}>{storyFn()}</div>);

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
