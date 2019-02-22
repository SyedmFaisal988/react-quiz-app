import { combineReducers} from 'redux';
import usersReducer from './UsersReducer';
import userAllowedTestReducer from './UserAllowedTestReducer';
import quizReducer from './QuizReducer';

const rootReducer = combineReducers({
    userAllowedTestReducer,
    usersReducer,
    quizReducer,
});

export default rootReducer;