import React from 'react';

function Result(props) {
        const {userName, loadTest, testName, totQuest, correctAns} = props.data;
        return(
            <div>
                <h1>
                    Quiz Result !!!
                </h1>
                <h3> Quiz Name: </h3>
                <h3> {testName}</h3>
                <br/>
                <h3> Student Name:  {userName}</h3>
                <h3> </h3>
                <h3> No of Correct Ans: {correctAns}</h3>
                <h3>Total Question: {totQuest}</h3>
            </div>
        )
}

export default Result;