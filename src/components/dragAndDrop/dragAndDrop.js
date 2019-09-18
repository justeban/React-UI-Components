import React, {useState} from 'react';
import classNames from 'classnames';

import { DraggableElement, DropTarget, Store } from './dragAndDropModule';

import './dragAndDrop.scss';

// Constants
const TODO = 'todo';
const DONE = 'done';

function DragAndDrop (props) {
     const [doneTasks, setDoneTasks] = useState(props.doneTasks);
     const [todoTasks, setTodoTasks] = useState(props.todoTasks);

     let movingTarget;

    // const removeTaskFrom = (column, index) => tasks[column].filter((el, i) => i !== index);

    // const addTaskAtIndex = ({ draggedColumn, draggedId, targetColumn, targetId = 0 }) => {
    //     const newTasks = [];
        
    //     tasks[targetColumn].length 
    //     ? tasks[targetColumn].forEach((el, i) => {
    //         if (i === parseInt(targetId)) { newTasks.push(tasks[draggedColumn][draggedId]); }
    //         newTasks.push(el);
    //      })
    //     : newTasks.push(tasks[draggedColumn][draggedId]);
        
    //     return newTasks;
    // }

    // const moveTask = ({ draggedColumn, draggedId, targetColumn, targetId }) => {
    //     let newDoneTasks, newTodoTasks;
        
    //     switch (draggedColumn) {
    //         case DONE:
    //             newDoneTasks = removeTaskFrom(DONE, parseInt(draggedId));
    //             newTodoTasks = addTaskAtIndex({ draggedColumn, draggedId, targetColumn, targetId });
    //             break;
    //         case TODO:
    //             newTodoTasks = removeTaskFrom(TODO, parseInt(draggedId));
    //             newDoneTasks = addTaskAtIndex({ draggedColumn, draggedId, targetColumn, targetId });
    //             break;
    //         default:
    //             return;
    //     }
    //     console.log({newDoneTasks, newTodoTasks})
    //     setTasks({done: newDoneTasks, todo: newTodoTasks});
    // }

    const handleOnDrop = e => {
        // console.log(e.dataTransfer.getData('movingItem'));
        // const allowedDropTargets = e.dataTransfer.getData('allowedDropTargets').split(',');
        // const canDrop = isAllowedDrop(allowedDropTargets);
        // console.log(canDrop);
        // const [draggedColumn, draggedId] = e.dataTransfer.getData('movingItem').split('-');
        // const [targetColumn, targetId] = e.target.id.split('-');
        // console.log(e.target.closest('.column').className);
        // const [classSSS, targetSS] = e.target.closest('.column').classList
        // console.log({ classSSS, targetSS });
        // if (draggedColumn !== targetColumn) {
        //     moveTask({ draggedColumn, draggedId, targetColumn, targetId });
        // }

        // // Remove 'moving-target' class from target
        // movingTarget.className = 'task';
    };
    // const handleTaskOnDragOver = e => {
    //     const element = e.target;
    //     const {top, height} = e.target.getClientRects()[0];
    //     const midpoint = top + (height / 2);
    //     const cursor = e.clientY;
    //     if (cursor <= midpoint) {
    //         // If in top half move above the element
    //         element.insertAdjacentElement('beforebegin', movingTarget);
            
    //         // const [columnMovingTo, targetIndex] = element.id.split('-');
    //         // const [columnMovingFrom, currentIndex] = movingTarget.id.split('-');

    //         // // To calculate the index above the targetIndex, condition to cover negatives
    //         // const indexAboveTargetIndex = (targetIndex - 1) < 0 ? 0 : targetIndex - 1

    //         // const newTasks = {};
    //         // newTasks[columnMovingTo] = addTaskAtIndex(columnMovingTo,  indexAboveTargetIndex, columnMovingFrom, currentIndex)
    //         // newTasks[columnMovingFrom] = removeTaskFrom(columnMovingFrom, currentIndex);
    //         // console.log(newTasks);
    //         // // setTasks({newTasks});
    //     }
    //     if (cursor > midpoint) {
    //         // If in bottom half move below the element
    //         element.insertAdjacentElement('afterend', movingTarget);
    //         console.log(tasks);
    //     }
    // }

     const displayTodos = () => {
        const todoTasks = props.todo;
        return (
            todoTasks.map((task, i) => (
                <DraggableElement
                    allowedDropTargets={[
                        'done-column'
                    ]}
                    dragId={`todo-${i}`}
                    key={i}
                >
                    <div 
                        className="task"
                        
                        
                        // onDragOver={handleTaskOnDragOver}
                    >
                        {task.title}
                    </div>
                </DraggableElement>
            ))
         )
     }

    const displayDones = () => {
        const doneTasks = props.done;
        return (
            doneTasks.map((task, i) => (
                <DraggableElement 
                    allowedDropTargets={[
                        'todo-column',
                    ]}
                    dragId={`done-${i}`}
                    key={i}
                >
                    <div
                        className="task"
                        
                        
                        // onDragOver={handleTaskOnDragOver}
                    >
                        {task.title}
                    </div>
                </DraggableElement>
            ))
        )
    }

    return(
        <section className={classNames({
            'drag-and-drop': true,
            'exiting': props.config.exiting
        })}>
            <h3>Drag and Drop</h3>
            <div className="col-2">
                <DropTarget
                    onDrop={props.moveItem}
                    targetId="todo-column"
                >
                    <div 
                        className="column todo" 
                        id="todo"
                    >
                        <h4>Todo</h4>
                        <div className="tasks todo-tasks">
                            {displayTodos()}
                        </div>
                    </div>
                </DropTarget>
                <DropTarget
                    onDrop={props.moveItem}
                    targetId="done-column"
                >
                    <div
                        className="column done"
                        id="done"
                    >
                        <h4>Done</h4>
                        <div className="tasks done-tasks">
                            {displayDones()}
                        </div>
                    </div>
                </DropTarget>
            </div>
        </section>
    )
}

export default DragAndDrop;


