/*eslint-disable*/
import React, { Component } from 'react';
import './Quizzes.css';
import Result from '../Result/Result'

function CourseDetail(props){
    const {courseName, totQuest, testName, history} = props.test;
    return(
        <div className="course-detail row col s12 ">
            <h1>{courseName}</h1>
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
            <button className="btn waves-effect waves-light" onClick={()=>{
                history.push('/quiz');
            }}> Start
                <i className="material-icons right">send</i>
            </button>
        </div>
    )
}

function DefaultData(){
    return(
        <div className="row col s12 center-align">
            <h1 style={{color: "#0288d1 "}}>
                Welcome to the Quiz App
            </h1>
            <p>These series of test are design to check your knowledge of the subject. These test are simentaneously difficult
                as well as easy depending upon your study and practice. Remember your are only allowed attemp any test only
                once so do it with great attentions. Click on any quiz to continue </p>
        </div>
    )
}

class AllQuizzes extends Component {
    constructor(props){
        super(props);
        this.state = props.data;
        this.state.active = null;
        this.state.showResult = false;
        this.state.loadTest = props.loadTest;
        this.state.UserAllowedTest = this.props.UserAllowedTest;
        this.state.currentUser = this.props.currentUser;
        this.state.testActive = null;
        console.log('constructor')
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return({
            loadTest: nextProps.loadTest
        })
    }

    changeChildDisplayStatus = (courseNumber) => {
        const { courses, loadTest } = this.state;
        courses[courseNumber].testChildDisplayStatus = !courses[courseNumber].testChildDisplayStatus;
        loadTest[0]= courseNumber;
        this.setState({
            courses,
            active: courseNumber,
            loadTest
        })
    }
    setLoadTest = (courseNo, testNo) => {
        const temp = [courseNo, testNo];
        const testResults =this.props.UserAllowedTest;
        if(testResults[courseNo].res[testNo]){
            this.setState({
                showResult: true,
                testActive: temp,
            })        
        }else{
            this.setState({
                testActive: temp,
            })
        }
        this.props.changeLoadTest(temp);
    }   
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
            <div className="dashboard-row row">
                <div className="navbar grey darken-2 row" >
                    <div className="dashboard">
                        <strong>Dash Board</strong>
                        <i className="material-icons left">dashboard</i>
                    </div>
                    <div className="logout-btn">
                        <button className="waves-effect waves-teal btn-flat grey darken-2"><strong>LOGOUT</strong>
                            <i style={{ width: '30px', height: '30px' }} className="material-icons left">exit_to_app</i>
                        </button>
                    </div>
                </div>
                <div className="space-filler col s3 row grey darken-2 left-align">
                </div>

                <div style={{ float: 'right'}}  className="details col s6 m9 row">
                    {
                        (active===null)? <DefaultData/>: 
                        UserAllowedTest[loadTest[0]].res[loadTest[1]]? <Result data={data}/>: <CourseDetail test={courseDetail}/>
                    }
                </div>

                <div className="quiz-tree row grey darken-2 col s6 m3 left-align">
                    <div >
                        {
                            this.state.courses.map((course, index) => {
                                return <div className="quiz-tree-wrapper col s12 row " key={course + "-" + index}>
                                    <div onClick={() => this.changeChildDisplayStatus(index)} className= {(active===index)?"quiz-tree-courses row course-active": "quiz-tree-courses row"}>
                                        <i className="material-icons left">add</i>{course.name}
                                    </div>
                                    <div className="quiz-tree-courses-drop row">
                                        {course.testChildDisplayStatus ? <ul>
                                            {course.tests.map((course_test, ind) =>
                                                <li className={(index===loadTest[0]&&ind===loadTest[1])?"course-active":"" } key={"test" + ind} onClick={() => { this.setLoadTest(index, ind) }}><i className="material-icons left">indeterminate_check_box</i>
                                                {course_test.name}</li>
                                            )}
                                        </ul> : null}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default AllQuizzes;