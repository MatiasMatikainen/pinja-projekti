import React, { useState } from 'react';
import SearchBar from './SearchBar'; // Korjaa polku tarvittaessa
import './App.css';

function App() {
  const [consultant, setConsultant] = useState({
    name: '',
    education: '',
    certification: '',
    projectExperience: '',
    workExperience: ''
  });

  const handleChange = (e) => {
    setConsultant({ ...consultant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consultant Details:", consultant);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pinjan osaamisenhallinnan ohjelmisto</h2>
        <SearchBar onSearch={value => console.log(value)} />
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={consultant.name} onChange={handleChange} placeholder="Konsultin nimi" />
          <input type="text" name="education" value={consultant.education} onChange={handleChange} placeholder="Koulutustiedot" />
          <input type="text" name="certification" value={consultant.certification} onChange={handleChange} placeholder="Sertifikaatit" />
          <input type="text" name="projectExperience" value={consultant.projectExperience} onChange={handleChange} placeholder="Projektikokemus" />
          <input type="text" name="workExperience" value={consultant.workExperience} onChange={handleChange} placeholder="Työkokemus" />
          <button type="submit">Tallenna Konsultin Tiedot</button>
        </form>
      </header>
    </div>
  );
}

export default App;
