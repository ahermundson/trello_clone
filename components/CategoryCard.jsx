import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { addCard, switchCategories } from '../redux/actionCreators';
import CategoryItemContainer from './CategoryItemContainer';

declare type CategoryType = {
  categoryName: string,
  id: number,
  projectID: number
};

const styles = {
  paper: {
    width: 300,
    textAlign: 'center',
    marginRight: 5,
    marginLeft: 5
  },
  divider: {
    color: 'black'
  }
};

const AddCardFormWrapper = styled.form`
  margin-bottom: 10px;
  width: 100%;
`;

const AddCardInput = styled.input`
  width: 95%;
  border: none;
  margin: 0 auto;
  padding: 7px 0 7px 0;
`;

const CategoryHeader = styled.h3`
  margin-top: 15px;
`;

class CategoryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCardName: ''
    };

    this.handleCardTitleChange = this.handleCardTitleChange.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  handleCardTitleChange(event) {
    this.setState({
      newCardName: event.target.value
    });
  }

  addCard(event) {
    event.preventDefault();
    this.props.addCard({
      cardName: this.state.newCardName,
      projectID: this.props.category.projectID,
      categoryID: this.props.category.id
    });
    this.setState({
      newCardName: ''
    });
  }

  render() {
    return (
      <Paper style={styles.paper}>
        <CategoryHeader>{this.props.category.categoryName}</CategoryHeader>
        <AddCardFormWrapper onSubmit={this.addCard}>
          <AddCardInput
            type="text"
            placeholder="Add Card"
            onChange={this.handleCardTitleChange}
            value={this.state.newCardName}
          />
        </AddCardFormWrapper>
        <Divider style={styles.divider} />
        <CategoryItemContainer
          category={this.props.category}
          switchCategories={this.props.switchCategories}
        />
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCard(newCard) {
    dispatch(addCard(newCard));
  },
  switchCategories(toCategoryID, cardID) {
    dispatch(switchCategories(toCategoryID, cardID));
  }
});

export default connect(null, mapDispatchToProps)(CategoryCard);

CategoryCard.propTypes = {
  category: PropTypes.shape({
    categoryName: PropTypes.string,
    id: PropTypes.number,
    projectID: PropTypes.string
  }).isRequired,
  addCard: PropTypes.func.isRequired,
  switchCategories: PropTypes.func.isRequired
};
