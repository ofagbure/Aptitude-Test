import React, { useState } from 'react';
import Progress from '../../components/Progress'
import AnswerComp from '../../components/AnswerComp'
import Question from '../../components/Question'
import QA from '../../components/QAData'
import Complete from '../../components/AfterPage'
import jobData from '../../components/Job'
import jobsData from '../../components/Job';
const axios = require('axios');

const number = [];
const finaljob = [];

function Quiz(props) {

    if(finaljob.length !== 0) {
        finaljob = []
    }

    const [selectQuest, setSelectQuest] = useState(0)
    const [selectAnswer, setSelectAnswer] = useState('')
    const [answers, setAnswers] = useState([]);
    



    const questions = QA[selectQuest];

    //---I was checking why questions wouldnt change---//
    // console.log(questions.id);
    // console.log(selectQuest + 1);

    //--- was trying to log the value of the buttons to see if it had any value at all---//
    const handleClick = e => {
        setSelectAnswer(e.target.value)
        console.log(e.target);
        
    }
    
   
    console.log(`length`, number.length);


    

    // console.log(`output`,finaljob);

    //--- each button increments the score count at a different value---//
    
    function goUp(e) {
        if (e.target.value === '1') {
            number.push('A');
            console.log("clicked", questions.choice1);
            console.log(number.length);

        } else if (e.target.value === '2') {
            number.push('A','b');
            console.log("clicked", questions.choice2);
            console.log(number.length);

        }else if (e.target.value === '3') {
            number.push('A','b','c');
            console.log("clicked", questions.choice3);
            console.log(number.length);

        }else  if (e.target.value === '4') {
            number.push('A','b','c','d');
            console.log("clicked", questions.choice4);
            console.log(number.length);

        }else if (e.target.value === '5') {
            number.push('A','b','c','d','e');
            console.log("clicked", questions.choice5);
            console.log(number.length);
        }   
    }

    function Test ()  {
        console.log('this one ',number.length)
        if(number.length <= 5) {
            finaljob.push(jobData[0].job);

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobsData[0].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )

        } else if(number.length <= 7) {
            
            finaljob.push(jobData[1].job);

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobData[1].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )
            

        }else if(number.length <= 10) {
            
            finaljob.push(jobData[2].job);

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobData[2].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )

        }else if(number.length <= 12) {
            
            finaljob.push(jobData[3].job);

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobData[3].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )

        }else if(number.length <= 15) {
            
            finaljob.push(jobData[4].job);

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobData[4].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )

        }else if(number.length <= 18) {
            
            finaljob.push(jobData[5].job);
            
            return(
                <div>
                    <h1 className="display-4"> We recommend for you to apply to <b>{jobData[5].job}</b> </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>

            )

        }else if(number.length <= 20) {
            
            finaljob.push(jobData[6].job);

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobData[6].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )

        }else if(number.length <= 21) {
            
            finaljob.push(jobData[7].job);

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobData[7].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )

        }else if(number.length === 23 || 24) {
            
            finaljob.push(jobData[8].job);
            

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobData[8].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )

        }else if(number.length === 25) {
            
            finaljob.push(jobData[9].job);

            return(
                <div>
                    <h1 className="display-4">  We recommend for you to apply to {jobData[9].job} </h1>
                    <button onClick={submitTstrslt}>Save!</button>
                </div>
            )

        }

    }
    const submitTstrslt = () => {
        const email = `${window.btoa('email')}`
        const usrEmail = window.atob(localStorage.getItem(`${email}`));
        console.log(`${finaljob}`);
        axios.post("/updateTestResults", {
            testResults: `${finaljob}`,
            email: usrEmail
        })
        .then(function (res) {
            if(res) {
                console.log(res);
                props.setPage('Candidate');
            }
        });
    }

    
    //--- next button function---//
    const next = (e) => {
        const answer = { questionsId: questions.id, answer: selectAnswer };
        answers.push(answer);

        setAnswers(answers);

        setSelectAnswer('');

        if (selectQuest + 1 < QA.length) {
            setSelectQuest(selectQuest + 1);
            
            return;
        }
    

    }
   
    if(selectQuest + 1 < QA.length) {
        
        return (
            <div>
                <Progress total={QA.length - 1} current={selectQuest + 1} />
                <Question question={questions.question} />
                
                <AnswerComp

                    question={questions}
                    selectAnswer={selectAnswer}
                    handleClick={handleClick, goUp}

                />
                <button value='next' className="btn btn-success btn-lg btn-block" onClick={next}> Next </button>
                

            </div>
        )
    } else if(QA.length === 6) {
        return (
        <div className="jumbotron" >
            <Complete />
            <Test />
        </div>
        )
    }
}

export default Quiz

