import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';

function App() {
  const [consultant, setConsultant] = useState({
    name: '',
    education: '',
    certification: '',
    projectExperience: '',
    workExperience: ''
  });

  const [consultants, setConsultants] = useState([]); // Lista tallennetuista konsulteista

  const handleChange = (e) => {
    setConsultant({ ...consultant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lisää uusi konsultti konsulteihin
    setConsultants([...consultants, consultant]);
    // Tyhjennä lomake
    setConsultant({
      name: '',
      education: '',
      certification: '',
      projectExperience: '',
      workExperience: ''
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pinjan osaamisenhallinnan ohjelmisto</h2>
        <SearchBar onSearch={value => console.log(value)} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={consultant.name}
            onChange={handleChange}
            placeholder="Konsultin nimi"
          />
          <input
            type="text"
            name="education"
            value={consultant.education}
            onChange={handleChange}
            placeholder="Koulutustiedot"
          />
          <input
            type="text"
            name="certification"
            value={consultant.certification}
            onChange={handleChange}
            placeholder="Sertifikaatit"
          />
          <input
            type="text"
            name="projectExperience"
            value={consultant.projectExperience}
            onChange={handleChange}
            placeholder="Projektikokemus"
          />
          <input
            type="text"
            name="workExperience"
            value={consultant.workExperience}
            onChange={handleChange}
            placeholder="Työkokemus"
          />
          <button type="submit">Tallenna Konsultin Tiedot</button>
        </form>

        {/* Näytetään listan konsultit sivun alaosassa */}
        <div className="consultant-list">
          <h3>Tallennetut konsultit</h3>
          <ul>
            {consultants.map((consultant, index) => (
              <li key={index}>
                <strong>{consultant.name}</strong><br />
                Koulutus: {consultant.education}<br />
                Sertifikaatit: {consultant.certification}<br />
                Projektikokemus: {consultant.projectExperience}<br />
                Työkokemus: {consultant.workExperience}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;