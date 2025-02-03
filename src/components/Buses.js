import React, { useState, useEffect } from 'react';

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [editingBus, setEditingBus] = useState(null);

  // Fetch buses when the component mounts
  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/buses');
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const data = await response.json();
      setBuses(data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const addBus = async () => {
    if (!name || !capacity) {
      alert("Both fields are required");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/buses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, capacity }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      setName('');
      setCapacity('');
      await fetchBuses();
    } catch (error) {
      console.error("Error adding bus:", error);
      alert("Failed to add bus.");
    }
  };

  const updateBus = async () => {
    if (!name || !capacity) {
      alert("Both fields are required");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/buses/${editingBus.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, capacity }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      setName('');
      setCapacity('');
      setEditingBus(null);
      await fetchBuses();
    } catch (error) {
      console.error("Error updating bus:", error);
      alert("Failed to update bus.");
    }
  };

  const deleteBus = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/buses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      await fetchBuses();
    } catch (error) {
      console.error("Error deleting bus:", error);
      alert("Failed to delete bus.");
    }
  };

  const editBus = (bus) => {
    setEditingBus(bus);
    setName(bus.name);
    setCapacity(bus.capacity);
  };

  const handleFormReset = () => {
    setName('');
    setCapacity('');
    setEditingBus(null);
  };

  return (
    <div>
      <h1>Buses</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bus Name"
        />
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Capacity"
        />
        {editingBus ? (
          <div>
            <button onClick={updateBus}>Update Bus</button>
            <button onClick={handleFormReset}>Cancel</button>
          </div>
        ) : (
          <button onClick={addBus}>Add Bus</button>
        )}
      </div>
      <ul>
        {buses.map((bus) => (
          <li key={bus.id}>
            {bus.name} - Capacity: {bus.capacity}
            <button onClick={() => editBus(bus)}>Edit</button>
            <button onClick={() => deleteBus(bus.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buses;
