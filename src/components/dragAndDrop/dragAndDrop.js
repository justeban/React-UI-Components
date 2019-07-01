import React, {useState} from 'react';

import './dragAndDrop.scss';

// Constants
const TODO = 'todo';
const DONE = 'done';

export default function DragAndDrop () {
     const [tasks, setTasks] = useState({
         done: [
             {
                 title: 'Feed Cat'
             },
             {
                 title: 'Feed the Cattle'
             }
         ],
         todo: [
             {
                 title: 'Take out Garbage'
             },
             {
                 title: 'Feed Dog'
             }
         ]
     });

     let movingTarget;

    const removeTaskFrom = (column, index) => tasks[column].filter((el, i) => i !== parseInt(index));

    const addTaskTo = (column, index) => {
        switch (column) {
            case DONE:
                return [...tasks.done, tasks.todo[index]];
            case TODO:
                return [...tasks.todo, tasks.done[index]];
            default:
                return;
        }
    }
    // eslint-disable-next-line
    const addTaskAtIndex = (targetColumn, targetIndex, currentColumn, currentIndex) => {
        const newTasks = [];
        tasks[targetColumn].forEach((el, i) => {
            if (i === targetIndex) { newTasks.push(tasks[currentColumn][currentIndex]); }
            newTasks.push(el);
        });
        return newTasks;
    }

    const moveTask = idToMove => {
        const [columnFrom, index] = idToMove.split('-');
        let newDoneTasks, newTodoTasks;
        switch (columnFrom) {
            case DONE:
                newDoneTasks = removeTaskFrom(DONE, index);
                newTodoTasks = addTaskTo(TODO, index);
                break;
            case TODO:
                newTodoTasks = removeTaskFrom(TODO, index);
                newDoneTasks = addTaskTo(DONE, index);
                break;
            default:
                return;
        }
        setTasks({done: newDoneTasks, todo: newTodoTasks});
    }

    const handleOnDrop = e => {
       const idToMove = e.dataTransfer.getData('text');
       const targetColumn = e.target.id;
       if (!idToMove.includes(targetColumn)) {
           moveTask(idToMove);
       }

       // Remove 'moving-target' class from target
       movingTarget.className = 'task';
    }

    const handleAllowDrop = e => {
        e.preventDefault();
    }

    const handleOnDragStart = e => {
        movingTarget = e.target;
        e.dataTransfer.setData('text', movingTarget.id);

        // Add class name to moving target to denote in css
        movingTarget.className += ' moving-target';
    }

    const handleTaskOnDragOver = e => {
        const element = e.target;
        const {top, height} = e.target.getClientRects()[0];
        const midpoint = top + (height / 2);
        const cursor = e.clientY;
        if (cursor <= midpoint) {
            // If in top half move above the element
            element.insertAdjacentElement('beforebegin', movingTarget);
            
            // const [columnMovingTo, targetIndex] = element.id.split('-');
            // const [columnMovingFrom, currentIndex] = movingTarget.id.split('-');

            // // To calculate the index above the targetIndex, condition to cover negatives
            // const indexAboveTargetIndex = (targetIndex - 1) < 0 ? 0 : targetIndex - 1

            // const newTasks = {};
            // newTasks[columnMovingTo] = addTaskAtIndex(columnMovingTo,  indexAboveTargetIndex, columnMovingFrom, currentIndex)
            // newTasks[columnMovingFrom] = removeTaskFrom(columnMovingFrom, currentIndex);
            // console.log(newTasks);
            // // setTasks({newTasks});
        }
        if (cursor > midpoint) {
            // If in bottom half move below the element
            element.insertAdjacentElement('afterend', movingTarget);
            console.log(tasks);
        }
    }

     const displayTodos = () => {
        const todos = tasks.todo;
        return (
            todos.map((task, i) => (
                <div 
                    className="task"
                    draggable="true"
                    id={`todo-${i}`}
                    key={i}
                    onDragOver={handleTaskOnDragOver}
                    onDragStart={handleOnDragStart}
                >
                    {task.title}
                </div>
            ))
         )
     }

    const displayDones = () => {
        const dones = tasks.done;
        return (
            dones.map((task, i) => (
                <div
                    className="task"
                    draggable="true"
                    id={`done-${i}`}
                    key={i}
                    onDragOver={handleTaskOnDragOver}
                    onDragStart={handleOnDragStart}
                >
                    {task.title}
                </div>
            ))
        )
    }

    return(
        <section className="drag-and-drop">
            <h3>Drag and Drop</h3>
            <div className="col-2">
                <div 
                    className="column todo" 
                    id="todo"
                    onDrop={handleOnDrop}
                    onDragOver={handleAllowDrop}
                >
                    <h4>Todo</h4>
                    <div className="tasks todo-tasks">
                        {displayTodos()}
                    </div>
                </div>
                <div
                    className="column done"
                    id="done"
                    onDrop={handleOnDrop}
                    onDragOver={handleAllowDrop}
                >
                    <h4>Done</h4>
                    <div className="tasks done-tasks">
                        {displayDones()}
                    </div>
                </div>
            </div>
        </section>
    )
}