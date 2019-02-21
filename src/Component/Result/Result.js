import React from 'react';
import './Result.css';

function Result(props) {
    const { userName, testName, totQuest, correctAns } = props.data;
    return (
        <div>
            <div className="row col s12">
                <h1>
                    Quiz Result !!!
                </h1>
            </div>
            <div className="text-block col s12 row">
                <h5> Quiz Name: {testName}</h5>
            </div>
            <div className="text-block col s12 row">
                <h5> Student Name:  {userName}</h5>
            </div>            
            <div className="text-block col s12 row">
                <h5>Total Question: {totQuest}</h5>
            </div>
            <div className="ans-block text-block col s12 row">
                <h5><strong>No of Correct Ans</strong></h5>
            </div>
            <div className="res-block text-bloct col s12 row">
            <h5><strong>Your Score: {(correctAns*100)/totQuest}%</strong></h5>
            </div>
        </div>
    )
}

export default Result;