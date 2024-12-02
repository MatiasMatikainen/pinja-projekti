import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Sama tyylitiedosto kuin pääsivulla

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Navigointi takaisin pääsivulle

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Yksinkertainen kirjautumisen tarkistus (tätä voi laajentaa myöhemmin)
    if (username === 'admin' && password === 'admin') {
      navigate('/app'); // Ohjaa pääsivulle kirjautumisen jälkeen
    } else {
      alert('Virheellinen käyttäjätunnus tai salasana');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Poista tallennettu käyttäjä
    navigate('/'); // Siirrä kirjautumissivulle
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pinja Konsulttihallinta</h2> {/* Sama otsikko */}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Käyttäjätunnus"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit">Kirjaudu</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
