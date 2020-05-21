import React from "react";

export default function QuizIndex(props) {

  const setPage = props.setPage;
  const quizBtnHandler = () => {
    setPage('Quiz');
  }
  return (
    <div className="content quizBack" style={{ height: `${window.innerHeight}px`, paddingTop: '100px' }}>
      <div className='container'>
        <div className='row'>
          <h1 className='qHeader1'>Let your new career find you</h1>
        </div>
        <div className='qHeader2'>
          <h4>Find a career that you’re passionate about with our industry trusted career quiz.</h4>
        </div>
        <div>
          <button className='quizButton' onClick={quizBtnHandler}>Click Me!</button>
        </div>
      </div>

    </div>
  );
}