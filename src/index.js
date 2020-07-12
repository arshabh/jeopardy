import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Question from './Question'
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.css'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <Router>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/:catNum/:questionNum" component={Question}></Route>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
