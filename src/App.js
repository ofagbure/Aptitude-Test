import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Quiz from "./pages/Quiz/index";
import Footer from "./components/Footer";

function App() {
    document.title = "APT";
    return (
        <Router>
            <div>

                <Route exact path="/quiz" component={Quiz} />

                <Footer />
            </div>
        </Router>
    );
}

export default App;
