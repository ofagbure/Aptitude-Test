import React, { useState } from 'react';
import Progress from '../../components/Progress'
import AnswerComp from '../../components/AnswerComp'
import Question from '../../components/Question'
import QA from '../../components/QAData'


function Quiz() {

    const [selectQuest, setSelectQuest] = useState(0);
    const [selectAnswer, setSelectAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState('');
    const [count, setCount] = useState(0);



    const questions = QA[selectQuest];

    // I was checking why questions wouldnt change
    // console.log(questions);
    // console.log(questions.id);
    // console.log(QA.question);
    // console.log(QA.choice1);
    console.log(QA.length);

    function increment() {
        setCount(prevCount => prevCount + 1)
    }

    const handleClick = e => {
        setSelectAnswer(e.target.value)
    }



    const next = () => {
        const answer = { questionsId: questions.id, answer: selectAnswer };
        answers.push(answer);
        setAnswers(answers);
        setSelectAnswer('');

        if (selectQuest + 1 < QA.length) {
            setSelectQuest(selectQuest + 1);
            return;
        }
    }



    return (
        <div>
            <Progress total={QA.length} current={selectQuest + 1} />
            <Question question={questions.question} />
            <h2> Score: {count} </h2>
            <AnswerComp
                question={questions}
                selectAnswer={selectAnswer}
                handleClick={handleClick, increment} 
            />
            <button className="btn btn-success btn-lg btn-block" onClick={next}> Next </button>
            
        </div>
    )
}

export default Quiz

// handleClick={handleClick} onClick={next}
