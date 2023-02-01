import { takeLatest, all, call, put } from 'typed-redux-saga/macro'; //instead of redux-saga/effects

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';

import { CATEGORIES_ACTIONS_TYPES } from './categories.type';

export function* fetchCategoriesAsync() {
    try {
        // const categoriesArray = yield call(getCategoriesAndDocuments, 'categories'); remember the second argument is going to be its parameter
        const categoriesArray = yield* call(getCategoriesAndDocuments); 
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch(error) {
        yield* put(fetchCategoriesFailed(error as Error))
    }
}

export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync); // "take" is when we receive actions
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}