import React from 'react';
import Answer from './Answer'

function AnswerComp(props) {

    return (
        <div>
            <Answer
                answer={props.question.choice1}
                handleClick={props.handleClick}
                selected={'1'}
            />
            <Answer
                className={props.question.choice2}
                answer={props.question.choice2}
                handleClick={props.handleClick}
                selected={'2'}
            />
            <Answer


                className={props.question.choice3}
                answer={props.question.choice3}
                handleClick={props.handleClick}
                selected={'3'}
            />
            <Answer


                className={props.question.choice4}
                answer={props.question.choice4}
                handleClick={props.handleClick}
                selected={'4'}
            />
            <Answer

                className={props.question.choice5}
                answer={props.question.choice5}
                handleClick={props.handleClick}
                selected={'5'}
            />
        </div>
    )
}

export default AnswerComp