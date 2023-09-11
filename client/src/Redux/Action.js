import axios from 'axios';
export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';


export const fetchPostsStart = () => ({
    type: FETCH_POSTS_START,
});

export const fetchPostsSuccess = (posts) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
});

export const fetchPostsFailure = (error) => ({
    type: FETCH_POSTS_FAILURE,
    payload: error,
});


export const fetchPosts = () => {
    return async (dispatch) => {
        dispatch(fetchPostsStart());

        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            dispatch(fetchPostsSuccess(res.data));
        } catch (err) {
            dispatch(fetchPostsFailure(err.message));
        }
    };
};
