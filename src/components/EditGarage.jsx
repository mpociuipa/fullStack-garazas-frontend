import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditGarage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [head, setHead] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchGarage = async () => {
      try {
        const response = await axios.get(`/api/garages/${id}`);
        const { name, address, head } = response.data;
        setName(name);
        setAddress(address);
        setHead(head);
      } catch (err) {
        setError('Nepavyko gauti serviso duomenų');
      }
    };

    fetchGarage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/garages/${id}`, { name, address, head }, {
        headers: {
          'Authorization': token
        }
      });
      navigate('/mechanics');
    } catch (err) {
      setError('Nepavyko atnaujinti serviso duomenų');
    }
  };

  return (
    <div className="container">
      <h2>Redaguoti Servisą</h2>
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
        <button type="submit" className="btn btn-primary">Atnaujinti</button>
      </form>
    </div>
  );
};

export default EditGarage;
