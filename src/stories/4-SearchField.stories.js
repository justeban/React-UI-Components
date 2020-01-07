import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import SearchField from '../components/searchField/searchField';


export default {
  title: 'Search Field',
  decorators: [withKnobs],
};


export const _default = () => {
  const value = number('searchLimit', 3);
  const props = {
    searchLimit: value
  };
  return <SearchField config={props} />;
};