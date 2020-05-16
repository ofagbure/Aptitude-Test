import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Quiz from "./pages/Quiz/index";
import Footer from "./components/Footer";
import QuizHome from "./pages/QuizHome/QuizHome";
import Login from "./pages/login"
import CandidatePortal from "./pages/candidateportal"
import Home from "./pages/home"
import Roles from "./pages/roledescriptions"
import RecruiterPortal from "./pages/recruiterportal"

function App() {
  
  return (
    <Router>
      <div>
        <Route exact path="/quizStart" component={Quiz} />
        <Route exact path="/quiz" component={QuizHome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/candidateportal" component={CandidatePortal} />
        <Route exact path="/roles" component={Roles} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/recruiterportal" component={RecruiterPortal} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Footer  />
      </div>
    </Router>
  );
}

export default App;