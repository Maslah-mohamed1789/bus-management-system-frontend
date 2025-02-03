import React, { useState, useEffect } from 'react';

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [name, setName] = useState('');
  const [busId, setBusId] = useState('');

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/passengers');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setPassengers(data);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };

  const addPassenger = async () => {
    if (!name || !busId) {
      alert("Both fields are required");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/passengers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bus_id: busId }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      setName('');
      setBusId('');
      fetchPassengers();
    } catch (error) {
      console.error("Error adding passenger:", error);
    }
  };

  const deletePassenger = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/passengers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      fetchPassengers();
    } catch (error) {
      console.error("Error deleting passenger:", error);
    }
  };

  return (
    <div>
      <h1>Passengers</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Passenger Name"
      />
      <input
        type="number"
        value={busId}
        onChange={(e) => setBusId(e.target.value)}
        placeholder="Bus ID"
      />
      <button onClick={addPassenger}>Add Passenger</button>
      <ul>
        {passengers.map((passenger) => (
          <li key={passenger.id}>
            {passenger.name} - Bus ID: {passenger.bus_id}
            <button onClick={() => deletePassenger(passenger.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Passengers;
