        class QuizAction{
    static GET_QUIZ_DATA ="GET_QUIZ_DATA";
    static GET_LOADTEST = "GET_LOADTEST";
    static SET_LOADTEST = "SET_LOADTEST";
    static GET_TOTQUEST_QUIZ = "GET_TOTQUEST_QUIZ";
    static GET_COURSE_NAME = "GET_COURSE_NAME";
    static GET_TEST_NAME = "GET_TEST_NAME";
    static GET_ANSWERS = "GET_ANSWERS";
    
    static getQuizData(){
        return{
            type: this.GET_QUIZ_DATA,   
        }
    }
    static getLoadTest(){
        return{
            type: this.GET_TOTQUEST_QUIZ,
        }
    }
    static setLoadTest(loadTest){
        return{
            loadTest,
        }
    }
    static getTotQuestQuiz(){
        return{
            type: this.GET_TOTQUEST_QUIZ
        }
    }
    static getTestName(){
        return{
            type: this.GET_TEST_NAME
        }
    }
    static getCourseName(){
        return{
            type: this.GET_COURSE_NAME
        }
    }
    static getAnswer(){
        return{
            type: this.GET_ANSWERS,
        }
    }
}

export default QuizAction;