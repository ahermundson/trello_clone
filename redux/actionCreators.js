// @flow

import {
  ADD_PROJECT,
  DELETE_PROJECT,
  ADD_CATEGORY,
  ADD_CARD,
  SORT_CATEGORY_ITEMS
} from './actions';

declare type CategoryType = {
  projectID: number,
  categoryName: string
};

declare type CardType = {
  categoryID: number,
  cardName: string,
  projectID: number
};

export function addProject(projectName: string) {
  return { type: ADD_PROJECT, payload: projectName };
}

export function deleteProject(projectID: number) {
  return { type: DELETE_PROJECT, payload: projectID };
}

export function addCategory(newCategory: CategoryType) {
  return { type: ADD_CATEGORY, payload: newCategory };
}

export function addCard(newCard: CardType) {
  return { type: ADD_CARD, payload: newCard };
}

export function sortCategoryItems(
  hoverIndex: number,
  dragIndex: number,
  categoryID: number
) {
  return {
    type: SORT_CATEGORY_ITEMS,
    payload: {
      hoverIndex,
      dragIndex,
      categoryID
    }
  };
}
