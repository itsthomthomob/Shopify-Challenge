// React imports
import React, { Component } from 'react';
import './App.css';

// React router imports
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

// Page imports
import Home from '../Components/home';

// Theme imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
  );
  }
}

export default App;
