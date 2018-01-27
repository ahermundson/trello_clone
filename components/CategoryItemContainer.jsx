import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { sortCategoryItems } from '../redux/actionCreators';
import CategoryItem from './CategoryItem';
import Types from './ItemTypes';

const categoryItemTarget = {
  drop(props, monitor) {
    const dragItem = monitor.getItem();
    console.log(props);
    if (props.category.id === dragItem.categoryID) {
      return;
    }
    props.switchCategories(props.category.id, dragItem.id);
  }
};

function dropCollect(dndConnect, monitor) {
  return {
    connectDropTarget: dndConnect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const CategoryItemContainer = props =>
  props.connectDropTarget(
    <div>
      {props.cards.map((card, i) => (
        <div key={card.id}>
          <CategoryItem
            key={card.id}
            index={i}
            id={card.id}
            name={card.cardName}
            categoryID={card.categoryID}
            sort={props.sortCategoryItems}
          />
          <Divider />
        </div>
      ))}
    </div>
  );

const mapStateToProps = (state, ownProps) => ({
  cards: state.cards.filter(
    card =>
      card.projectID.toString() === ownProps.category.projectID &&
      card.categoryID === ownProps.category.id
  )
});

const mapDispatchToProps = dispatch => ({
  sortCategoryItems(hoverIndex, dragIndex, categoryID) {
    dispatch(sortCategoryItems(hoverIndex, dragIndex, categoryID));
  }
});

export default flow(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(Types.CATEGORY_CARD, categoryItemTarget, dropCollect)
)(CategoryItemContainer);

CategoryItemContainer.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardName: PropTypes.string,
      projectID: PropTypes.string,
      categoryID: PropTypes.number,
      id: PropTypes.number
    })
  ).isRequired,
  sortCategoryItems: PropTypes.func.isRequired
};
