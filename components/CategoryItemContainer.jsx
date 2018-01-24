import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { sortCategoryItems } from '../redux/actionCreators';
import CategoryItem from './CategoryItem';

const CategoryItemContainer = props => (
  <div>
    {props.cards.map((card, i) => (
      <div key={card.id}>
        <CategoryItem
          key={card.id}
          index={i}
          id={card.id}
          name={card.cardName}
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
  sortCategoryItems(hoverIndex, dragIndex) {
    dispatch(sortCategoryItems(hoverIndex, dragIndex));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryItemContainer
);

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
