import { createReducer } from 'redux-act';
import { getDataAction } from '../actions/index';

export const initialState = {
  data: [{}, []]
};

export default createReducer(
  {
    [getDataAction]: (state, result) => ({ ...state, data: result })
  },
  initialState
);
