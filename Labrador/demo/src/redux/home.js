import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

/**
 * Action Types
 */
export const HOME_REQUEST = 'HOME_REQUEST';
export const HOME_SUCCESS = 'HOME_SUCCESS';
export const HOME_FAILURE = 'HOME_FAILURE';

/**
 * Action Creators
 */
// 请求 action
export const homeRequest = createAction(HOME_REQUEST);

// 操作成功
export const homeSuccess = createAction(HOME_SUCCESS, ({ id }) => ({ id }));

// 操作失败
export const homeFailure = createAction(HOME_FAILURE, (error) => ({ error }));

/**
 * Initial State
 */
export const INITIAL_STATE = immutable({
  error: null,
  fetching: false
});

/**
 * Reducers
 */
export default handleActions({
  HOME_REQUEST: (state) =>
    state.merge({ fetching: true }),
  HOME_SUCCESS: (state, { payload }) =>
    state.merge({ fetching: false, error: null, ...payload }),
  HOME_FAILURE: (state, { payload }) =>
    state.merge({ fetching: false, error: payload.error })
}, INITIAL_STATE);
