import React, { useState, useEffect } from "react";

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [editingBus, setEditingBus] = useState(null);

  // Fetch buses when the component mounts
  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/buses");
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
      const response = await fetch("http://localhost:5000/api/buses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, capacity: Number(capacity) }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      handleFormReset();
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
      const response = await fetch(
        `http://localhost:3002/api/buses/${editingBus.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, capacity: Number(capacity) }),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      handleFormReset();
      await fetchBuses();
    } catch (error) {
      console.error("Error updating bus:", error);
      alert("Failed to update bus.");
    }
  };

  const deleteBus = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/buses/${id}`, {
        method: "DELETE",
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
    setName("");
    setCapacity("");
    setEditingBus(null);
  };

  return (
    <div style={styles.container}>
      <h1>Buses</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bus Name"
          style={styles.input}
        />
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          placeholder="Capacity"
          style={styles.input}
        />
        {editingBus ? (
          <div>
            <button
              style={styles.button}
              onClick={updateBus}
              disabled={!name || !capacity}
            >
              Update Bus
            </button>
            <button style={styles.cancelButton} onClick={handleFormReset}>
              Cancel
            </button>
          </div>
        ) : (
          <button
            style={styles.button}
            onClick={addBus}
            disabled={!name || !capacity}
          >
            Add Bus
          </button>
        )}
      </div>

      {buses.length === 0 ? (
        <p>No buses available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.id}</td>
                <td>{bus.name}</td>
                <td>{bus.capacity}</td>
                <td>
                  <button
                    style={styles.editButton}
                    onClick={() => editBus(bus)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => deleteBus(bus.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: { maxWidth: "600px", margin: "auto", textAlign: "center" },
  formContainer: { marginBottom: "20px" },
  input: { padding: "10px", margin: "5px", width: "40%" },
  button: { padding: "10px", margin: "5px", background: "green", color: "white", border: "none", cursor: "pointer" },
  cancelButton: { padding: "10px", margin: "5px", background: "gray", color: "white", border: "none", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  editButton: { padding: "5px 10px", margin: "5px", background: "blue", color: "white", border: "none", cursor: "pointer" },
  deleteButton: { padding: "5px 10px", margin: "5px", background: "red", color: "white", border: "none", cursor: "pointer" },
};

export default Buses;
