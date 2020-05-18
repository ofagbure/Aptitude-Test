import React from "react";
import QuizIndex from "../../components/quizIndex";
import {withRouter} from 'react-router';

export default withRouter(function QuizHome() {
  return <QuizIndex />;
})