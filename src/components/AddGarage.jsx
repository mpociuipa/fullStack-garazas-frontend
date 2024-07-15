import React, { useState } from 'react';
import axios from 'axios';

const AddGarage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [head, setHead] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/garages', { name, address, head }, {
        headers: {
          'Authorization': token
        }
      });
      // Pranešimas apie sėkmingą veiklą
    } catch (err) {
      setError('Nepavyko pridėti serviso.');
    }
  };

  return (
    <div className="container">
      <h2>Pridėti Servisą</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Pavadinimas</label>
          <input 
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Adresas</label>
          <input 
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vadovas</label>
          <input 
            type="text"
            className="form-control"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Pridėti</button>
      </form>
    </div>
  );
};

export default AddGarage;
