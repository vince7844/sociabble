import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthScreen from './screens/Auth/AuthScreen';
import HomeScreen from './screens/Home/HomeScreen';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AuthScreen />}>
          <Route path="*" element={<AuthScreen />}/>
        </Route>
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
