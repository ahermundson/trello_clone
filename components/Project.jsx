import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { DragDropContext } from 'react-dnd';
import flow from 'lodash/flow';
import HTML5Backend from 'react-dnd-html5-backend';
import { addCategory } from '../redux/actionCreators';
import CategoryCard from './CategoryCard';

const CategoryCardContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ProjectHeader = styled.h3`
  margin: 55px 0 0 10px;
  font-family: Roboto, sans-serif;
`;

const ProjectContainer = styled.div`
  display: flex;
`;

const AddContainerDiv = styled.div`
  margin-left: 10px;
`;

const styles = {
  underlineStyle: {
    borderColor: '#0d47a1'
  },
  underlineFocusStyle: {
    borderColor: 'grey'
  },
  hintTextStyle: {
    color: '#0d47a1'
  }
};

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategoryName: ''
    };
    this.handleAddCategoryChange = this.handleAddCategoryChange.bind(this);
    this.onNewCategorySubmit = this.onNewCategorySubmit.bind(this);
  }

  onNewCategorySubmit(event) {
    event.preventDefault();
    this.props.addCategory({
      categoryName: this.state.newCategoryName,
      projectID: this.props.match.params.projectId
    });
    this.setState({
      newCategoryName: ''
    });
  }

  handleAddCategoryChange(event) {
    this.setState({
      newCategoryName: event.target.value
    });
  }

  render() {
    return (
      <div>
        <ProjectHeader>{this.props.project.projectName}</ProjectHeader>
        <ProjectContainer>
          <CategoryCardContainer>
            {this.props.categories.map(category => (
              <CategoryCard
                style={{ width: 200 }}
                key={category.id}
                category={category}
              />
            ))}
          </CategoryCardContainer>
          <AddContainerDiv>
            <form onSubmit={this.onNewCategorySubmit}>
              <TextField
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                hinttextstyle={styles.hintTextStyle}
                hintText="Add Category"
                onChange={this.handleAddCategoryChange}
                value={this.state.newCategoryName}
              />
            </form>
          </AddContainerDiv>
        </ProjectContainer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const project = state.projects.find(
    projectIteratee =>
      projectIteratee.id.toString() === ownProps.match.params.projectId
  );
  const { categories } = state;
  return {
    project,
    categories
  };
};

const mapDispatchToProps = dispatch => ({
  addCategory(newCategoryName) {
    dispatch(addCategory(newCategoryName));
  }
});

export default flow(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Project);

Project.propTypes = {
  project: PropTypes.shape({
    projectName: PropTypes.string,
    id: PropTypes.number
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string
    })
  }).isRequired,
  addCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.string,
      projectID: PropTypes.string,
      id: PropTypes.number
    })
  ).isRequired
};
