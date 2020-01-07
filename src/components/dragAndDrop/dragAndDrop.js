import React from 'react';
import classNames from 'classnames';

import { DraggableElement, DropTarget} from './dragAndDropModule';

import './dragAndDrop.scss';

function DragAndDrop (props) {

     const displayTodos = () => {
        return (
            props.todo.map((task, i) => (
                <DraggableElement
                    allowedDropTargets={[
                        'done-column'
                    ]}
                    dragId={`todo-${i}`}
                    key={i}
                >
                    <div className="task" >
                        {task.title}
                    </div>
                </DraggableElement>
            ))
         )
     };

    const displayDones = () => {
        return (
            props.done.map((task, i) => (
                <DraggableElement 
                    allowedDropTargets={[
                        'todo-column',
                    ]}
                    dragId={`done-${i}`}
                    key={i}
                >
                    <div className="task">
                        {task.title}
                    </div>
                </DraggableElement>
            ))
        )
    };
    const exiting = (props.config && props.config.exiting) || false;
    return (
        <section className={classNames({
            'drag-and-drop': true,
            'exiting': exiting
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
    );
}

export default DragAndDrop;


