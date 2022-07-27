import { createSelector } from "reselect"; // this makes our selector, a memoized one. a memoization is the process in which you cache the previous value of something so that if the input has not changed then you just return back the same output

const selectCategoryReducer = (state) => state.categories; // this selector is the only one getting run

export const selectCategories = createSelector(
  // this selector is a memoized selector
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector( // so we're saying here that : as long as the categories arrray does not change do not re-run this method(dont even bother rerunning it)
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);

// export const selectCategories = createSelector(
//   [selectCategoryReducer, selectCurrentUser],
//   (categories, currentUser) => categories.categories
//   )

// export const selectCategoriesMap = (state) => {
//   console.log("selectCategoriesMap");
//   return state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };
