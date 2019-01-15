import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Report from "./components/reportLists/reports";
import Index from "./components/layout/Index";

import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/ReportListing" component={Index} />
                <Route
                  exact
                  path="/ReportListing/lyrics/track/:id"
                  component={Report}
                />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
