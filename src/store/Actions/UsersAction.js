class UsersAction{

    static USER_GET = "USER_GET";
    static USER_FIND = "USER_FIND";
    static USER_GET_FAILED = "USER_GET_FAILED"; 
    static DELETE_CURRENT_USER = "DELETE_CURRENT_USER"; 
    static GET_USER_INDEX = "GET_USER_INDEX";

    static getUser(userInput){
        return{
            type: this.USER_GET,
            userInput,
        }
    }
    static getUserIndex(){
        return{
            type: this.GET_USER_INDEX
        }
    }
    static deleteCurrentUser(){
        return{
            type: this.DELETE_CURRENT_USER
        }
    }
}

export default UsersAction;