import React from 'react';

export default function DraggableElement (props) {
    const {
        allowedDropTargets,
        children,
        dragId
    } = props;


    const handleOnDragStart = e => {
        const movingItem = e.target;
        e.dataTransfer.setData('movingItem', movingItem.id);
        e.dataTransfer.setData('allowedDropTargets', allowedDropTargets.toString() )
        // Add class name to moving target to denote in css
        movingItem.className += ' moving-target';
    };

    const handleOnDragEnd = e => {
        const movingItem = e.target;
        movingItem.classList.remove('moving-target');
    };

    return (
        <div
            className="draggable-element"
            draggable
            id={dragId}
            onDragEnd={handleOnDragEnd}
            onDragStart={handleOnDragStart}
        >
            {
                React.cloneElement(children)
            }
        </div>
    );
}