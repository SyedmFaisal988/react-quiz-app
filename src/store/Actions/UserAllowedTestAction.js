class UserAllowedTestAction{

    static GET_QUIZ_TAKEN_STATUS = "GET_QUIZ_TAKEN_STATUS";
    static SET_QUIZ_TAKEN_STATUS = "SET_QUIZ_TAKEN_STATUS";
    static GET_QUIZ_MARKS = "GET_QUIZ_MARKS";
    static SET_QUIZ_MARKS =  "SET_QUIZ_MARKS"; 

    static getUserId(){
        return{
            type: this.GET_USER_ID
        }
    }
    static getQuizTakenStatus(){
        return{
            type: this.GET_QUIZ_TAKEN_STATUS
        }
    }
    static setQuizTakenStatus(){
        return{
            type: this.SET_QUIZ_TAKEN_STATUS
        }
    }
    static getQuizMarks(){
        return{
            type: this.GET_QUIZ_MARKS
        }
    }
    static setQuizMarks(){
        return{
            type: this.GET_QUIZ_MARKS
        }
    }
}

export default UserAllowedTestAction;