
import { combineReducers } from 'redux';
import {
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from './Action';

const postsReducer = (state = { data: [], isLoading: false, error: null }, action) => {
    switch (action.type) {
        case FETCH_POSTS_START:
            return { ...state, isLoading: true, error: null };
        case FETCH_POSTS_SUCCESS:
            return { ...state, data: action.payload, isLoading: false };
        case FETCH_POSTS_FAILURE:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    posts: postsReducer,
});

export default rootReducer;
