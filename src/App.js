import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import MainApp from './MainApp'; // Nykyinen App-komponentti siirretty tänne

function App() {
  return (
    <Router>
      <Routes>
        {/* Kirjautumissivu */}
        <Route path="/" element={<Login />} />
        
        {/* Varsinainen sovellus */}
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </Router>
  );
}


export default App;