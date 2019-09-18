import React from 'react';

export default function DropTarget (props) {
    const {
        children,
        onDrop,
        targetId
    } = props;


    const handleOnDragOver = e => {
        e.preventDefault();
    };

    const handleOnDrop = e => {
        const allowedDropTargets = e.dataTransfer.getData('allowedDropTargets').split(',');
        const canDrop = isAllowedDrop(allowedDropTargets);
        if (canDrop && onDrop) { onDrop()({
            dragId: e.dataTransfer.getData('movingItem'),
            dropTargetId: targetId
        }); }
    };

    const isAllowedDrop = (allowedDropTargets) => {
        return allowedDropTargets.includes(targetId);
    };

    const elProps = {
        onDragOver: handleOnDragOver,
        onDrop: handleOnDrop
    };

    return (
        React.cloneElement(
            children,
            elProps
        )
    );
}