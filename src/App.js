import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "./utils/AuthRoute";
import { Home, Login, Register, SinglePost } from "./pages";
import { Container } from "semantic-ui-react";
import Body from "./Body";
import { AuthProvider } from "./context/auth";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Body />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
