import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components';
import store from '../redux/store';
import Landing from './Landing';
import Project from './Project';
import Header from './Header';

const AppDiv = styled.div`
  margin-top: 45px;
`;

const FourOhFour = () => <h1>404</h1>;

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>
        <AppDiv className="app">
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/project/:projectId" component={Project} />
            <Route component={FourOhFour} />
          </Switch>
        </AppDiv>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
