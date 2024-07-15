import React from 'react';

const MechanicCard = ({ mechanic, onRate }) => {
  return (
    <div className="card">
      <img src={mechanic.image} className="card-img-top" alt={`${mechanic.firstName} ${mechanic.lastName}`} />
      <div className="card-body">
        <h5 className="card-title">{mechanic.firstName} {mechanic.lastName}</h5>
        <p className="card-text">Specializacija: {mechanic.specialization}</p>
        <p className="card-text">Miestas: {mechanic.city}</p>
        <button onClick={() => onRate(mechanic._id)} className="btn btn-primary">
          Vertinti ❤️ ({mechanic.rating})
        </button>
      </div>
    </div>
  );
};

export default MechanicCard;
