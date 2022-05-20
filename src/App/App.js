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
import Box from '@mui/material/Box';

const theme = createTheme({
  palette: {
    primary: {
      light: '#76d275',
      main: '#43a047',
      dark: '#2C2A39',
      contrastText: '#F5F4F1'
    },
    secondary: {
      light: '#9c786c',
      main: '#6d4c41',
      dark: '#2C2A39',
      contrastText: '#F5F4F1',
    }
  }
});

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
            <Route exact path='/shopify-challenge/' element={< Home />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
  );
  }
}

export default App;
