import { combineReducers } from 'redux';
import topics from './topics/reducers';
import newTopic from './new-topic/duck';
import newUser from './signup/duck';
import loginUser from './signin/duck';

export default combineReducers({
  topics,
  newTopic,
  newUser,
  loginUser
});
