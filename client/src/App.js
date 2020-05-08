import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Quiz from "./pages/Quiz/index";
import Footer from "./components/Footer";
import QuizHome from "./pages/QuizHome/QuizHome";

function App() {
  document.title = "APT";
  return (
    <Router>
      <div>
        <Route exact path="/quizStart" component={Quiz} />
        <Route exact path="/quiz" component={QuizHome} />
        
        <Footer  />
      </div>
    </Router>
  );
}

export default App;