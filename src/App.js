import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Container } from "semantic-ui-react";
import Body from "./Body";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Container>
        <Body />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Container>
    </Router>
  );
}

export default App;