const TODO = 'todo';
const DONE = 'done';

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

    let newTodos;
    let newDones;
    
    switch(columnMovingFrom) {
        case TODO:
            newTodos = removeItemFromArray(state[columnMovingFrom], index);
            newDones = addItemToArray(arrayMovingTo, itemMoving);
            break;
        case DONE:
            newDones = removeItemFromArray(state[columnMovingFrom], index);
            newTodos = addItemToArray(arrayMovingTo, itemMoving);
            break;
        default:
            return;
    }
    
    setState({
        todo: newTodos,
        done: newDones
    });
}

function removeItemFromArray(arr, index) {
    return arr.filter((item, i) => index !== `${i}`);
}
function addItemToArray(arr, item) {
    return [...arr, item];
}

export const reducers = {
    moveItem
}
