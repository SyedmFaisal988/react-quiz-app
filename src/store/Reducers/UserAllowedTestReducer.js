import UserAllowerActions from '../Actions/UserAllowedTestAction';
import QuizActions from '../Actions/QuizAction';

function UserAllowedTestReducer(
    state={
        user: [{
            userId: 0,
            testResults: [{
                res: [false, null],
                marks: [0, 0],
            }, {
                res: [false],
                marks: [0]
            }]
        }]
    }, action
){
    switch(action.type){
        case UserAllowerActions.GET_QUIZ_TAKEN_STATUS:
        return{
            ...state
        }
    }
}