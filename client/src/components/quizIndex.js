import React from "react";
import { Route } from "react-router-dom"
import "./quiz.css";
export default function QuizIndex() {

  const Button = () => (
    <Route render={({ history}) => (
      <button
        type='button' className='quizButton'
        onClick={() => { history.push('/quizStart') }}
      >
        Click Me!
      </button>
    )} />
  )
 
  return (
    <div className="content">
      <h1 className="header-large">Let your new career find you</h1>
      <h4 className="title-small">
        Find a career that you’re passionate about with our industry trusted
        career quiz.
      </h4>
      <Button/>
    </div>
  );
}