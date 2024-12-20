import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function App() {
  const [consultant, setConsultant] = useState({
    name: '',
    education: '',
    certification: '',
    projectExperience: '',
    workExperience: ''
  });

  const [consultants, setConsultants] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const [editIndex, setEditIndex] = useState(null); // To track which consultant is being edited
  const navigate = useNavigate(); // Declare navigate here

  const handleChange = (e) => {
    setConsultant({ ...consultant, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(consultant).forEach(key => {
      if (!consultant[key]) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        // Update existing consultant
        const updatedConsultants = [...consultants];
        updatedConsultants[editIndex] = consultant;
        setConsultants(updatedConsultants);
      } else {
        // Add new consultant
        setConsultants([...consultants, consultant]);
      }
      resetForm();
    }
  };

  const handleDelete = (index) => {
    const newConsultants = consultants.filter((_, i) => i !== index);
    setConsultants(newConsultants);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const generatePDF = (consultant) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Konsultin CV", 20, 20);

    doc.setFontSize(12);
    doc.text(`Nimi: ${consultant.name}`, 20, 40);
    doc.text(`Koulutus: ${consultant.education}`, 20, 50);
    doc.text(`Sertifikaatit: ${consultant.certification}`, 20, 60);
    doc.text(`Projektikokemus: ${consultant.projectExperience}`, 20, 70);
    doc.text(`Työkokemus: ${consultant.workExperience}`, 20, 80);

    doc.save(`${consultant.name}-CV.pdf`);
  };

  const filteredConsultants = consultants.filter((c) =>
    c.name.toLowerCase().includes(searchQuery)
  );

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    navigate('/'); // Navigate to the login page
  };

  const resetForm = () => {
    setConsultant({
      name: '',
      education: '',
      certification: '',
      projectExperience: '',
      workExperience: ''
    });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setConsultant(consultants[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pinja Konsulttihallinta</h2>

        {/* Kirjaudu ulos -painike */}
        <button className="logout-button" onClick={handleLogout}>
          Kirjaudu ulos
        </button>

        <SearchBar onSearch={handleSearch} />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={consultant.name}
            onChange={handleChange}
            placeholder={errors.name ? "Konsultin nimi (Pakollinen*)" : "Konsultin nimi"}
            className={errors.name ? "error-input" : ""}
          />
          <input
            type="text"
            name="education"
            value={consultant.education}
            onChange={handleChange}
            placeholder={errors.education ? "Koulutustiedot (Pakollinen*)" : "Koulutustiedot"}
            className={errors.education ? "error-input" : ""}
          />
          <input
            type="text"
            name="certification"
            value={consultant.certification}
            onChange={handleChange}
            placeholder={errors.certification ? "Sertifikaatit (Pakollinen*)" : "Sertifikaatit"}
            className={errors.certification ? "error-input" : ""}
          />
          <input
            type="text"
            name="projectExperience"
            value={consultant.projectExperience}
            onChange={handleChange}
            placeholder={errors.projectExperience ? "Projektikokemus (Pakollinen*)" : "Projektikokemus"}
            className={errors.projectExperience ? "error-input" : ""}
          />
          <input
            type="text"
            name="workExperience"
            value={consultant.workExperience}
            onChange={handleChange}
            placeholder={errors.workExperience ? "Työkokemus (Pakollinen*)" : "Työkokemus"}
            className={errors.workExperience ? "error-input" : ""}
          />
          <button type="submit">{isEditing ? 'Tallenna muutokset' : 'Tallenna Konsultin Tiedot'}</button>
          {isEditing && <button type="button" onClick={resetForm}>Peruuta</button>} {/* Cancel button */}
        </form>

        <div className="consultant-list">
          <h3>Tallennetut konsultit</h3>
          <ul>
            {filteredConsultants.map((consultant, index) => (
              <li key={index} className="consultant-item">
                <div className="consultant-content">
                  <img src="/picture.jpg" alt="Consultant" className="consultant-image" />
                  <div>
                    <strong>{consultant.name}</strong><br />
                    Koulutus: {consultant.education}<br />
                    Sertifikaatit: {consultant.certification}<br />
                    Projektikokemus: {consultant.projectExperience}<br />
                    Työkokemus: {consultant.workExperience}
                  </div>
                </div>
                <button onClick={() => handleDelete(index)} className="delete-button">
                  Poista
                </button>
                {/* Muokkaa-painike on nyt Poista ja Lataa PDF:nä painikkeiden väliin */}
                <button onClick={() => handleEdit(index)} className="edit-button">
                  Muokkaa
                </button>
                <button onClick={() => generatePDF(consultant)} className="download-button">
                  Lataa CV PDF:nä
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;