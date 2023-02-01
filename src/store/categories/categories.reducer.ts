import { AnyAction } from 'redux';
import { Category } from "./categories.type";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./categories.action";


export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}
 //The Problem with Discriminating Unions(as CategoryAction) : we know that redux will test each action in all the reducers not just the reducer it belongs to(in contrast with useReducer hook). also redux initilization, middleware pass these all different actions, there's lots of different actions that might be fired. so this reducer is assuming that all the actions coming through, are going to be one of these three types but in reality that's not true. if we delete the default type we get no error, and that's a problem because eventhough we might have this default return state we still want typescript to be accurate 
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction): CategoriesState => { // action={} as CategoryAction // if we had said " action: CategoryAction" we couldn't have initialize the action object with a default value because the typescript would complain why the action is empty while it should be of one of those three types
    
    if(fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if(fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            categories: action.payload,
            isLoading: false,
        }
    }

    if(fetchCategoriesFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        }
    }

    return state;


    // switch(action.type) { 
    //     case CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START: 
    //         return {
    //             ...state,
    //             isLoading: true,
    //         }
    //     case CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCESS:
    //         return {
    //             ...state,
    //             categories: action.payload,
    //             isLoading: false,
    //         }
    //     case CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_FAILED: 
    //         return {
    //             ...state,
    //             error: action.payload,
    //             isLoading: false,
    //         }
    //     default:
    //         return state;
    // }
}

// question: why did we need to use matchable Action creators in order to solve this problem? couldn't we just replace the descriminating union with AnyAction and then when we delete the default part of the switch statement it would still give us an error so we'd basically get the same result 
// so why do we still need to use machable action creators?? you can see the difference if you hover over the action object in both approach and you can see that with matchers(which have type predicate) action has the exact type