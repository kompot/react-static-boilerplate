import { combineReducers } from 'redux';
import { reducer as github } from './github';

export default combineReducers({
  github,
});
