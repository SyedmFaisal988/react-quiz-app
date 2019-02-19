import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Quizzes';
import Quiz from './Component/Quiz/Quiz';

const data = {
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
    }],
    temp: ""
}

const UserAllowedTest = [{
    userId: 0,
    testResults: [{
        res: [false, null],
        marks: [0, 0],
    }, {
        res: [false],
        marks: [0]
    }]
}]

class MyRouter extends Component {
    state = {
        currentUser: JSON.parse(localStorage.getItem("currentUser")),
        loadTest: [0, 0],
        userIndex: null,
    }
    updateCurrentUser = () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user !== null) {
            let userIndex = this.findUserIndex(user);
            this.setState({
                currentUser: user,
                userIndex,
            })
        }
    }

    findUserIndex = (contUser) => {
        let { currentUser } = this.state;
        if(currentUser===null){
            currentUser = contUser;
        }
        let userIndex = 0;
        for (userIndex = 0; userIndex < UserAllowedTest.length; userIndex++) {
            if (UserAllowedTest[userIndex].userId === currentUser.id)
                break;
        }
        return userIndex;
    }

    changeTestResult = (value) => {
        const { loadTest } = this.state;
        const userIndex = this.findUserIndex();
        UserAllowedTest[userIndex].testResults[loadTest[0]].marks[loadTest[1]] = value;
    }
    changeLoadTest = (value) => {
        this.setState({
            loadTest: value,
        })
    }
    render() {
        const { currentUser, loadTest, userIndex } = this.state;
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />

                        <PrivateQuizzesRoute
                            findUserIndex={this.findUserIndex}
                            userIndex={userIndex}
                            updateCurrentUser={this.updateCurrentUser}
                            changeLoadTest={this.changeLoadTest}
                            currentUser={currentUser}
                            loadTest={loadTest}
                            path="/dashboard"
                            component={Dashboard} />

                        <PrivateQuizRoute
                            currentUser={currentUser}
                            updateCurrentUser={this.updateCurrentUser}
                            changeTestResult={this.changeTestResult}
                            loadTest={loadTest} 
                            testData={data.courses[loadTest[0]].tests[loadTest[1]]}
                            path="/quiz"
                            component={Quiz} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

const PrivateQuizRoute = ({ component: Component, updateCurrentUser, currentUser, loadTest, changeTestResult, testData, ...rest }) => {
    if (!currentUser) {
        updateCurrentUser();
        return <Route {...rest} render={(props) => <Login history={props.history} routeTo="/dashboard" />} />
    }
    UserAllowedTest[currentUser.id].testResults[loadTest[0]].res[loadTest[1]] = true;
    return (
        <Route {...rest} render={(props) => <Component {...props} data={testData} changeTestResult={changeTestResult} />} />

    )
}

const PrivateQuizzesRoute = ({ component: Component, userIndex, findUserIndex ,updateCurrentUser, currentUser, loadTest, changeLoadTest, ...rest }) => {
    if (!currentUser) {
        updateCurrentUser();
        return <Route {...rest} render={(props) => <Login history={props.history} routeTo="/dashboard" />} />
    }
    else{
        if(userIndex===null){
            userIndex = findUserIndex();
        }
        return (
            <Route {...rest} render={(props) => <Component {...props}
                currentUser={currentUser}
                loadTest={loadTest}
                data={data}
                UserAllowedTest={UserAllowedTest[userIndex].testResults} 
                changeLoadTest={changeLoadTest} />} />
        )
    }
}

export default MyRouter;

