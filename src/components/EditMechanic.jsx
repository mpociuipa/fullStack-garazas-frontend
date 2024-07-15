import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMechanic = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [image, setImage] = useState('');
  const [city, setCity] = useState('');
  const [garage, setGarage] = useState('');
  const [garages, setGarages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMechanic = async () => {
      try {
        const response = await axios.get(`/api/mechanics/${id}`);
        const { firstName, lastName, specialization, image, city, garage } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setSpecialization(specialization);
        setImage(image);
        setCity(city);
        setGarage(garage);
      } catch (err) {
        setError('Nepavyko gauti meistro duomenų');
      }
    };

    const fetchGarages = async () => {
      try {
        const response = await axios.get('/api/garages');
        setGarages(response.data);
      } catch (err) {
        setError('Nepavyko gauti servisų sąrašo');
      }
    };

    fetchMechanic();
    fetchGarages();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/mechanics/${id}`, { firstName, lastName, specialization, image, city, garage }, {
        headers: {
          'Authorization': token
        }
      });
      navigate('/mechanics');
    } catch (err) {
      setError('Nepavyko atnaujinti meistro duomenų');
    }
  };

  return (
    <div className="container">
      <h2>Redaguoti Meistrą</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Vardas</label>
          <input 
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pavardė</label>
          <input 
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Specializacija</label>
          <input 
            type="text"
            className="form-control"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nuotrauka</label>
          <input 
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Miestas</label>
          <input 
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Servisas</label>
          <select 
            className="form-control"
            value={garage}
            onChange={(e) => setGarage(e.target.value)}
            required
          >
            <option value="">Pasirinkite servisą</option>
            {garages.map((garage) => (
              <option key={garage._id} value={garage._id}>{garage.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Atnaujinti</button>
      </form>
    </div>
  );
};

export default EditMechanic;
