import React, { useState, useEffect } from 'react';

const Routelines = () => {
  const [routelines, setRoutelines] = useState([]);
  const [newRouteline, setNewRouteline] = useState({ name: '', bus_id: '' });
  const [editRouteline, setEditRouteline] = useState({ id: null, name: '', bus_id: '' });

  useEffect(() => {
    fetchRoutelines();
  }, []);

  const fetchRoutelines = async () => {
    try {
      const response = await fetch('http://localhost:5000/routelines');
      if (!response.ok) throw new Error('Failed to fetch routelines');
      const data = await response.json();
      setRoutelines(data);
    } catch (error) {
      console.error('Error fetching routelines:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRouteline({ ...newRouteline, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditRouteline({ ...editRouteline, [name]: value });
  };

  const addRouteline = async () => {
    try {
      const response = await fetch('http://localhost:5000/routelines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRouteline),
      });
      if (!response.ok) throw new Error('Failed to add routeline');
      const data = await response.json();
      setRoutelines([...routelines, data]);
      setNewRouteline({ name: '', bus_id: '' });
    } catch (error) {
      console.error('Error adding routeline:', error);
    }
  };

  const updateRouteline = async () => {
    try {
      const response = await fetch(`http://localhost:5000/routelines/${editRouteline.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editRouteline),
      });
      if (!response.ok) throw new Error('Failed to update routeline');
      fetchRoutelines();
      setEditRouteline({ id: null, name: '', bus_id: '' });
    } catch (error) {
      console.error('Error updating routeline:', error);
    }
  };

  const deleteRouteline = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/routelines/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete routeline');
      fetchRoutelines();
    } catch (error) {
      console.error('Error deleting routeline:', error);
    }
  };

  return (
    <div>
      <h1>Routelines</h1>

      <div>
        <h2>Add Routeline</h2>
        <input
          type="text"
          name="name"
          placeholder="Routeline Name"
          value={newRouteline.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="bus_id"
          placeholder="Bus ID"
          value={newRouteline.bus_id}
          onChange={handleInputChange}
        />
        <button onClick={addRouteline}>Add Routeline</button>
      </div>

      {editRouteline.id && (
        <div>
          <h2>Edit Routeline</h2>
          <input
            type="text"
            name="name"
            placeholder="Routeline Name"
            value={editRouteline.name}
            onChange={handleEditInputChange}
          />
          <input
            type="number"
            name="bus_id"
            placeholder="Bus ID"
            value={editRouteline.bus_id}
            onChange={handleEditInputChange}
          />
          <button onClick={updateRouteline}>Update Routeline</button>
        </div>
      )}

      <ul>
        {routelines.map((routeline) => (
          <li key={routeline.id}>
            {routeline.name} - Bus ID: {routeline.bus_id}
            <button onClick={() => setEditRouteline(routeline)}>Edit</button>
            <button onClick={() => deleteRouteline(routeline.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routelines;
