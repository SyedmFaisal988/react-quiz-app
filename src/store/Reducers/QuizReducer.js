import QuizActions from '../Actions/QuizAction';

function QuizReducer(state = {
    data:{
    courses: [{
        id: 0,
        name: "Development Enteprenuer",
        testChildDisplayStatus: false,
        tests: [{
            id: 0,
            name: "Development Enteprenuer - test 1",
            questions: [{
                question: "what is enterprenuership ?",
                options: ["hota ha bhai", "kya karna jan kay", "mujhy khud nhe pata", "main kyun bataon?"],
            }, {
                question: "why you need to aim for enterprenuership ?",
                options: ["aur kuch karnay ko tha nhe", "asi sexy lag raha tha", "kahin job nhe milli", "kuch tou karna hi tha"]
            }],
            answers: [2, 1],
        }, {
            id: 1,
            name: "Development Enteprenuer - test 2",
            questions: [{
                question: "what is enterprenuership ?",
                options: ["hota ha bhai", "kya karna jan kay", "mujhy khud nhe pata", "main kyun bataon?"]
            }, {
                question: "why you need to aim for enterprenuership ?",
                options: ["aur kuch karnay ko tha nhe", "asi sexy lag raha tha", "kahin job nhe milli", "kuch tou karna hi tha"]
            }],
            answers: [3, 2],
        }]
    }, {
        id: 1,
        name: "JavaScript Developer",
        testChildDisplayStatus: false,
        tests: [{
            id: 0,
            name: "JavaScript test 1",
            questions: [{
                question: "JavaScipt kyun parhtay hain",
                options: ["aur kuch mila nhe", "web kay liye aur koi option nhe", "ye bhi sexy lag raha tha", "sastay nachay ka shoq tha",]
            }],
            answers: [4],
        }]
    }]
},
loadTest: [0,0],
}, action) {
    switch(action.type){
        case QuizActions.GET_QUIZ_DATA:
        data = state.data.courses.tests[state.loadTest[0], state.loadTest[1]]
        return{
            data,
        }
        case QuizActions.GET_LOADTEST:
        return{
            loadTest: state.loadTest,
        }
        case QuizActions.SET_LOADTEST:
        state.loadTest = action.loadTest;
        return{
            loadTest: state.loadTest,
        }
        case QuizActions.GET_TOTQUEST_QUIZ:
        return{
            totQuest: state.data.courses[state.loadTest[0]].tests[state.loadTest[1]].questions.length,
        }
        case QuizActions.GET_COURSE_NAME:
        return{
            courseName: state.data.courses[state.loadTest[0]].name,
        }
        case QuizActions.GET_TEST_NAME:
        return{
            testName: state.data.courses[state.loadTest[0]].tests[state.loadTest[1]].name
        }
        case QuizActions.GET_ANSWERS:
        return{
            answers: state.data.courses[state.loadTest[0]].tests[state.loadTest[1]].answers
        }
        default:
        return{
            state,
        }
    }
}

export default QuizReducer;