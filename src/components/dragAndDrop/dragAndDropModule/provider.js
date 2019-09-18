import React, { useState } from 'react';

export default function Provider(props) {
    const {
        children,
        initialState,
        reducers: storeReducers
    } = props;

    const [storeState, setStoreState] = useState(initialState);

    const wrapReducers = (reducers) => {
        const wrappedReducers = {};
        const reducerKeys = Object.keys(reducers);
        reducerKeys.forEach(key => {
            wrappedReducers[key] = () => reducers[key]({ state: storeState, setState: setStoreState })
        });
        return wrappedReducers;
    };

    const wrappedReducers = wrapReducers(storeReducers);

    return (
        React.cloneElement(
            children,
            { ...storeState, ...wrappedReducers }
        )
    );
}