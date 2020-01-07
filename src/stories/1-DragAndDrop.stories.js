import React from "react";
import { withKnobs, object, array } from "@storybook/addon-knobs";
import DragAndDrop from "../components/dragAndDrop/dragAndDrop";
import { Provider } from "../components/dragAndDrop/dragAndDropModule";
import { reducers } from "../components/dragAndDrop/store";

export default {
  title: "Drag and Drop",
  decorators: [withKnobs]
};

export const _default = () => {
    const _todos = array('todos', ['Feed The Cat', 'Feed the Dog']);
    const _dones = array('dones', ['Kick the Goat', 'Grease The Pigs']);

    const todos = _todos.map(el => ({title: el}));
    const dones = _dones.map(el => ({title: el}));

    const initialState = {
        todo: todos,
        done: dones
    };
    return (
    <Provider initialState={initialState} reducers={reducers}>
      <DragAndDrop />
    </Provider>
  );
}
