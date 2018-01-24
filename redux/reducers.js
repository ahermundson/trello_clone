// @flow
import update from 'immutability-helper';
import { combineReducers } from 'redux';
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  ADD_CATEGORY,
  ADD_CARD,
  SORT_CATEGORY_ITEMS
} from './actions';

let projectCounter = 0;
let categoryCounter = 0;
let cardCounter = 0;

const projects = (state = [], action) => {
  switch (action.type) {
    case ADD_PROJECT:
      projectCounter += 1;
      return [{ projectName: action.payload, id: projectCounter }, ...state];
    case DELETE_PROJECT:
      return state.filter(project => project.ID !== action.payload);
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      categoryCounter += 1;
      return [
        ...state,
        {
          categoryName: action.payload.categoryName,
          projectID: action.payload.projectID,
          id: categoryCounter
        }
      ];
    default:
      return state;
  }
};

const cards = (state = [], action) => {
  switch (action.type) {
    case ADD_CARD:
      cardCounter += 1;
      return [
        {
          cardName: action.payload.cardName,
          projectID: action.payload.projectID,
          categoryID: action.payload.categoryID,
          id: cardCounter
        },
        ...state
      ];
    case SORT_CATEGORY_ITEMS: {
      const dragCard = state[action.payload.dragIndex];
      return update(state, {
        $splice: [
          [action.payload.dragIndex, 1],
          [action.payload.hoverIndex, 0, dragCard]
        ]
      });
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({ projects, categories, cards });

export default rootReducer;
