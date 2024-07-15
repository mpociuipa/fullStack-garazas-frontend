import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('USER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', { name, email, password, userType });
      localStorage.setItem('token', response.data.token);  // Saugo token vietoje
      navigate('/');  // Nukreipia į pagrindinį puslapį
    } catch (err) {
      setError('Nepavyko registruotis. Patikrinkite, ar visi laukeliai užpildyti tinkamai.');
    }
  };

  return (
    <div className="container">
      <h2>Registracija</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Vardas</label>
          <input 
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">El. paštas</label>
          <input 
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Slaptažodis</label>
          <input 
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vartotojo tipas</label>
          <select 
            className="form-control"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="USER">Vartotojas</option>
            <option value="ADMIN">Administratorius</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Registruotis</button>
      </form>
    </div>
  );
};

export default Register;

