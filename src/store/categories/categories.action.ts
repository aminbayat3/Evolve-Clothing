import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTIONS_TYPES, Category } from "./categories.type";

export type FetchCategoriesStart = Action<CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_FAILED, Error>;

// union type
// export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
  return createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START);
});

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => {
  return createAction(
    CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );
});

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => {
  return createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_FAILED, error);
});
  

