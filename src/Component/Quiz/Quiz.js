import React, { Component } from 'react';
import './Quiz.css'

class Quiz extends Component {
    state = {
        test: this.props.data,
        questNo: 0,
        proposedAns: [],
        tempAns: 0,
        totalQuestions: 0
    }
    componentDidMount() {
        const temp = this.state.test.questions.length-1;
        console.log('total questions  ', temp);
        this.setState({
            totalQuestions: temp
        })
    }
    setProposedAns = (event) => {
        const temp = event.target.name;
        console.log('temp answer value', temp);
        this.setState({
            tempAns: temp,
        })
    }
    nextItem = () => {
        let temp1 = this.state.proposedAns;
            temp1[this.state.questNo] = Number(this.state.tempAns);
        if (this.state.questNo === this.state.totalQuestions) {
            this.setState({
                proposedAns: temp1
            })
            const correctAns = this.state.test.answers;
            let correctCount = 0;
            for(let i=0;i<=this.state.totalQuestions;i++){
                if(correctAns[i]===this.state.proposedAns[i])
                    correctCount = correctCount+1;
            }
            this.props.changeTestResult(correctCount);
            this.props.history.push({pathname: "/dashboard"});
        } else {
            const temp = this.state.questNo+1;
            this.setState({
                proposedAns: temp1,
                questNo: temp,
            })
        }
    }
    render() {
        const tempQuestion = this.state.test.questions[this.state.questNo];
        return (
            <div className=" quiz-header row col s12">
                <div className="row quiz-name row col s12 m12">
                    <h1>{this.state.test.name}</h1>
                </div>
                {
                    <div className="quiz-question row col s12" style={{textAlign: 'left',  
                        }} >
                            <div className="question-options" onChange={this.setProposedAns}>
                            <p>{tempQuestion.question} </p>
                            <p>
                                <label>
                                    <input type="radio" value={tempQuestion.options[0]} name="0" checked={"0"===this.state.tempAns} /> 
                                    <span>{tempQuestion.options[0]}</span>
                                </label>    
                            </p>
                            <p>
                                <label>
                                <input type="radio" value={tempQuestion.options[1]} name="1" checked={"1"===this.state.tempAns} /> 
                                <span>{tempQuestion.options[1]} </span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input type="radio" value={tempQuestion.options[2]} name="2" checked={"2"===this.state.tempAns} /> 
                                <span>{tempQuestion.options[2]} </span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input type="radio" value={tempQuestion.options[3]} name="3" checked={"3"===this.state.tempAns} /> 
                                <span>{tempQuestion.options[3]} </span>
                                </label>
                            </p>
                                <button className="waves-effect waves-light btn right" type="button" onClick={this.nextItem}>{(this.state.questNo === this.state.totalQuestions)?"submit":"next"}</button>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default Quiz;