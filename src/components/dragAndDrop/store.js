import {TOP} from './dragAndDropModule/DropTarget';

export const initialState = {
    todo: [
        {
            title: 'Feed The Cat'
        },
        {
            title: 'Feed the Dog'
        }
    ],
    done: [
        {
            title: 'Kick the Goat',
        },
        {
            title: 'Grease the Pigs'
        }
    ]
};

const moveItem = ({state, setState}) => ({dragId, dropTargetId}) => {
    const [columnMovingFrom, index] = dragId.split('-');
    const arrayMovingFrom = state[columnMovingFrom]
    const columnMovingTo = dropTargetId.split('-')[0];
    const arrayMovingTo = state[columnMovingTo];
    const itemMoving = arrayMovingFrom[index];

    const newState = {
        ...state
    };
    
    newState[columnMovingFrom] = removeItemFromArray(arrayMovingFrom, index);
    newState[columnMovingTo] = addItemToArray(arrayMovingTo, itemMoving);
    
    setState(newState);
}

const moveItemOnDragOver = ({ state, setState }) => (dragProps) => {
    const {
        draggedOverId,
        dragId,
        dropTargetId,
        position
    } = dragProps;

    const [columnMovingFrom, index] = dragId.split('-');
    const arrayMovingFrom = state[columnMovingFrom]
    const columnMovingTo = dropTargetId.split('-')[0];
    const arrayMovingTo = state[columnMovingTo];
    const itemMoving = arrayMovingFrom[index];
    
    const [, idx] = draggedOverId.split('-');
    const _index = position === TOP ? parseInt(idx) : parseInt(idx) + 1;
    const __index = _index < 0 ? 0 : _index;

    const newState = {
        ...state
    };

    newState[columnMovingFrom] = removeItemFromArray(arrayMovingFrom, index);
    newState[columnMovingTo] = addItemToArrayByIndex(arrayMovingTo, itemMoving, __index);

    setState(newState);
}

function removeItemFromArray(arr, index) {
    return arr.filter((item, i) => index !== `${i}`);
}

function addItemToArray(arr, item) {
    return [...arr, item];
}

function addItemToArrayByIndex(arr, item, idx) {
    const newArr = [];
    arr.forEach((el, i) => {
        if (i === idx) { newArr.push(item); }
        newArr.push(el);
    });
    if (arr.length === newArr.length) { newArr.push(item); }
    return newArr;
}

export const reducers = {
    moveItem,
    moveItemOnDragOver
};
