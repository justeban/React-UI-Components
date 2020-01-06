import React from 'react';

export const TOP = 'TOP';
export const BOTTOM = 'BOTTOM';

export default function DropTarget (props) {
    const {
        children,
        onDragOver,
        onDrop,
        targetId
    } = props;

    let currentPosition, currentDraggedOverEl, currentDraggedOverId, top, height;

    const handleOnDragOver = e => {
        e.preventDefault();

        // const _target = e.target.closest('.draggable-element');
    
        // if (!_target) { return; }

        // ({ top, height } = _target.getClientRects()[0]);
        // const midpoint = top + (height / 2);
        // const cursor = e.clientY;
        // const _position = cursor <= midpoint ? TOP : BOTTOM;

        // if (_target 
        //     && _target.id === currentDraggedOverId 
        //     && currentPosition === _position
        // ) { return; }

        // currentDraggedOverEl = _target;
        // currentDraggedOverId = currentDraggedOverEl.id; 
        // currentPosition = _position;        
        // const dragId = document.getElementsByClassName('moving-target')[0].id;

        // onDragOver()({
        //     draggedOverId: currentDraggedOverId,
        //     dragId,
        //     dropTargetId: targetId,
        //     position: _position
        // });
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