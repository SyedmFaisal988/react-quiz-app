import React, { Component } from 'react';

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
            console.log('propsed ans ',this.state.proposedAns);
            console.log('correct ans ', correctAns);
            let correctCount = 0;
            for(let i=0;i<=this.state.totalQuestions;i++){
                console.log('looping')
                if(correctAns[i]===this.state.proposedAns[i])
                    correctCount = correctCount+1;
            }
            this.props.changeTestResult(correctCount);
            console.log('coorect Ans ', correctCount);
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
            <div>
                <h1>{this.state.test.name}</h1>
                {
                    <div style={{textAlign: 'left',
                        paddingLeft: '40%'
                        }} >
                        <p>{tempQuestion.question} </p>
                            <div onChange={this.setProposedAns}>
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
                                <button style={{float: "right", marginRight: '70%'}} className="waves-effect waves-light btn" type="button" onClick={this.nextItem}>{(this.state.questNo === this.state.totalQuestions)?"submit":"next"}</button>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default Quiz;