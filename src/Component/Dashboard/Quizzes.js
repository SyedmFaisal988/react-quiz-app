/*eslint-disable*/
import React, { Component } from 'react';
import './Quizzes.css';
import Result from '../Result/Result'
import * as firebase from 'firebase';

function CourseDetail(props) {
    const { courseName, totQuest, testName, history } = props.test;
    return (
        <div className="course-detail left row col s12 ">
            <div className="row">
                <h1 className="detail-header">{courseName}</h1>
            </div>
            <div className=" row text-block">
                <h5 className="right-aligner left">Course Name: &emsp;</h5>
                <h5 className="left"> {testName}</h5>
            </div>
            <div className="row text-block">
                <h5 className="right-aligner left">Total Questions: &emsp;</h5>
                <h5 className="left"> {totQuest}</h5>
            </div>
            <div className="row text-block">
                <h5 className="right-aligner left">Attemps Available: &emsp;</h5>
                <h5 className="left"> 1</h5>
            </div>
            <div className="row text-block">
                <h5 className="right-aligner left">Passing creteria: &emsp;</h5>
                <h5 className="left"> 70%</h5>
            </div>
            <button className="btn waves-effect waves-light left start-btn" onClick={() => {
                history.push('/quiz');
            }}> Start
                <i className="material-icons right">send</i>
            </button>
        </div>
    )
}

function DefaultData() {
    return (
        <div className="row col s12 center-align">
        <div className="row col s12">
            <h1 style={{ color: "#0288d1 " }}>
                Welcome to the Quiz App
            </h1>
        </div>
            <p>These series of test are design to check your knowledge of the subject. These test are simentaneously difficult
                as well as easy depending upon your study and practice. Remember your are only allowed attemp any test only
                once so do it with great attentions. Click on any quiz to continue </p>
        </div>
    )
}

class AllQuizzes extends Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.active = null;
        this.state.showResult = false;
        this.state.loadTest = props.loadTest;
        this.state.UserAllowedTest = this.props.UserAllowedTest;
        this.state.currentUser = this.props.currentUser;
        this.state.testActive = null;
        this.state.updateCurrentUser = props.updateCurrentUser;
        this.state.animatedDrop = null;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
            loadTest: nextProps.loadTest
        })
    }

    changeChildDisplayStatus = (courseNumber) => {
        const { courses, loadTest } = this.state;
        courses[courseNumber].testChildDisplayStatus = !courses[courseNumber].testChildDisplayStatus;
        loadTest[0] = courseNumber;
        loadTest[1] = 0;
        this.setState({
            courses,
            active: courseNumber,
            loadTest
        })
    }
    setLoadTest = (courseNo, testNo) => {
        const temp = [courseNo, testNo];
        const testResults = this.props.UserAllowedTest;
        if (testResults[courseNo].res[testNo]) {
            this.setState({
                showResult: true,
                testActive: temp,
            })
        } else {
            this.setState({
                testActive: temp,
            })
        }
        this.props.changeLoadTest(temp);
    }
    dropDownAnimate = (divId, length, click)=>{
        if(this.state.animatedDrop!==null){
            if(this.state.animatedDrop.divId===divId && click==='click'){
                this.clearAnimatedDrop(this.state.animatedDrop.divId, this.state.animatedDrop.length)
                this.setState({
                    animatedDrop: null
                })
                return;    
            }
            if(this.state.animatedDrop.divId===divId && click!=='click'){
                return;
        }
            this.clearAnimatedDrop(this.state.animatedDrop.divId, this.state.animatedDrop.length)
        }

        var elem = document.getElementById(divId);
        let pos = 0;
        let posLimit = length*64
        function frame(){
            if(pos===posLimit){
                clearInterval(id)
            }
            pos=pos+1;
            elem.style.height = pos+'px'
        }
        var id = setInterval(frame, 5)
        this.setState({
            animatedDrop: {
                divId,
                length
            }
        })
    }
    clearAnimatedDrop=(ev, length)=>{
        var elem = document.getElementById(ev);
        let pos = length*64;
        function frame(){
            if(pos===0){
                clearInterval(id)
            }
            pos=pos-1;
            elem.style.height = pos+'px'
        }
        var id = setInterval(frame, 5)
    }

    // componentDidMount() {
    //      const  rootRef = firebase.database().ref().child('react');
    //      const speedRef = rootRef.child('speed');
    //      speedRef.on('value', snap=>{
    //              stuff
    //          });
    // }

    render() {
        const { active, loadTest, UserAllowedTest, courses, currentUser } = this.state;
        const courseDetail = {
            courseName: courses[loadTest[0]].name,
            totQuest: courses[loadTest[0]].tests[loadTest[1]].questions.length,
            testName: courses[loadTest[0]].tests[loadTest[1]].name,
            history: this.props.history
        }
        const data = {
            userName: currentUser.username,
            totQuest: courses[loadTest[0]].tests[loadTest[1]].questions.length,
            loadTest,
            testName: courses[loadTest[0]].tests[loadTest[1]].name,
            correctAns: UserAllowedTest[loadTest[0]].marks[loadTest[1]],
        }
        return (
            <div className="dashboard-row col s12 row">
                <div className="navbar grey darken-2 row" >
                    <div className="dashboard">
                    <i className="material-icons left">dashboard</i>
                        <strong>Dash Board</strong>
                    </div>
                    <div className="logout-btn">
                        <button onClick={this.props.deleteCurrentUser} className="waves-effect waves-teal btn-flat grey darken-2"><strong>LOGOUT</strong>
                            <i style={{ width: '30px', height: '30px' }} className="material-icons left">exit_to_app</i>
                        </button>
                    </div>
                </div>

                <div className="quiz-tree row col s12 m3  ">
                    <div >
                        {
                            this.state.courses.map((course, index) => {
                                return <div className="quiz-tree-wrapper grey darken-2 col s12 " key={course + "-" + index}>
                                    <div onClick={() => {
                                        this.changeChildDisplayStatus(index)
                                        this.dropDownAnimate("drop"+index, course.tests.length, "click")
                                    }} 
                                        onMouseOver={()=>{
                                            this.changeChildDisplayStatus(index)
                                            this.dropDownAnimate("drop"+index, course.tests.length)}} 
                                            className= "quiz-tree-courses row">
                                        <i className="material-icons left">add</i>{course.name}
                                    </div>
                                    <ul id={"drop"+index}
                                        className={"courses-drop drop-down"+index+" row"}>
                                            {course.tests.map((course_test, ind) =>
                                                <li className={(index === loadTest[0] && ind === loadTest[1]) ? "course-active" : ""} key={"test" + ind} onClick={() => { this.setLoadTest(index, ind) }}><i className="material-icons left">indeterminate_check_box</i>
                                                    {course_test.name}</li>
                                            )}
                                    </ul>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div style={{ float: 'right' }} className="details col s12 m9 row">
                    {
                        (active === null) ? <DefaultData /> :
                            UserAllowedTest[loadTest[0]].res[loadTest[1]] ? <Result data={data} /> : <CourseDetail test={courseDetail} />
                    }
                </div>
            </div>
        )
    }
}

export default AllQuizzes;