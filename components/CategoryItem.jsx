import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

import Types from './ItemTypes';

const cardSource = {
  beginDrag(props) {
    // RETURNS TO TARGET
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    // console.log(component);
    const hoverBoundingRect = component.decoratedComponentInstance.node.getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = 37.5;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // console.log(JSON.stringify(clientOffset, null, 2));

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items heights
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      // console.log(`${hoverClientY} Middle ${hoverMiddleY}`);
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    // Time to actually perform the action
    props.sort(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex; // eslint-disable-line no-param-reassign
  }
};

const Card = styled.div`
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function dragCollect(dndConnect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: dndConnect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

function dropCollect(dndConnect) {
  return {
    connectDropTarget: dndConnect.dropTarget()
  };
}

class CategoryItem extends Component {
  render() {
    const { connectDragSource, connectDropTarget, isDragging } = this.props;

    return connectDragSource(
      connectDropTarget(
        <div
          ref={node => {
            this.node = node;
          }}>
          <Card
            style={{
              visibility: isDragging ? 'hidden' : 'visible',
              border: isDragging ? '1px solid pink' : null
            }}>
            <h5>{this.props.name}</h5>
          </Card>
        </div>
      )
    );
  }
}

export default flow(
  DragSource(Types.CATEGORY_CARD, cardSource, dragCollect),
  DropTarget(Types.CATEGORY_CARD, cardTarget, dropCollect)
)(CategoryItem);

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};
