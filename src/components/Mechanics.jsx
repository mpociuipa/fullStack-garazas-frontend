import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MechanicCard from './MechanicCard';

const Mechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMechanics = async () => {
      const response = await axios.get('/api/mechanics');
      setMechanics(response.data);
    };

    fetchMechanics();
  }, []);

  const handleRating = async (id) => {
    await axios.post(`/api/mechanics/${id}/rate`);
    const updatedMechanics = mechanics.map(m => m._id === id ? { ...m, rating: m.rating + 1 } : m);
    setMechanics(updatedMechanics);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/mechanics/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      setMechanics(mechanics.filter(m => m._id !== id));
    } catch (err) {
      console.error('Nepavyko ištrinti meistro');
    }
  };

  return (
    <div className="container">
      <h1>Automobilių Serviso Meistrai</h1>
      <input
        type="text"
        placeholder="Ieškoti meistro..."
        className="form-control mb-3"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <div className="row">
        {mechanics
          .filter(mechanic => {
            const fullName = `${mechanic.firstName} ${mechanic.lastName}`;
            return fullName.toLowerCase().includes(searchQuery.toLowerCase());
          })
          .map(mechanic => (
            <div key={mechanic._id} className="col-md-4 mb-3">
              <MechanicCard mechanic={mechanic} onRate={handleRating} />
              {token && (
                <>
                  <Link to={`/edit-mechanic/${mechanic._id}`} className="btn btn-warning btn-sm">Redaguoti</Link>
                  <button onClick={() => handleDelete(mechanic._id)} className="btn btn-danger btn-sm">Pašalinti</button>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Mechanics;
