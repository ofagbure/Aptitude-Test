import React from 'react';
import Answer from './Answer'

function AnswerComp(props) {
    return (
        <div>
            <Answer
                increment={1}
                answer={props.question.choice1}
                handleClick={props.handleClick}
                selected={props.selectAnswer === '1'}
            />
            <Answer
                increment={2}
                answer={props.question.choice2}
                handleClick={props.handleClick}
                selected={props.selectAnswer === '2'}
            />
            <Answer 
                increment={3}
                answer={props.question.choice3}
                handleClick={props.handleClick}
                selected={props.selectAnswer === '3'}
            />
            <Answer
                increment={4}
                answer={props.question.choice4}
                handleClick={props.handleClick}
                selected={props.selectAnswer === '4'}
            />
            <Answer
                increment={5}
                answer={props.question.choice5}
                handleClick={props.handleClick}
                selected={props.selectAnswer === '5'}
            />
        </div>
    )
}

export default AnswerComp