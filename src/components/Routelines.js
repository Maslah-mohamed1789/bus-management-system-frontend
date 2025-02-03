import React, { useState, useEffect } from "react";

const Routelines = () => {
  const [routelines, setRoutelines] = useState([]);
  const [newRouteline, setNewRouteline] = useState({ name: "", bus_id: "" });
  const [editRouteline, setEditRouteline] = useState({ id: null, name: "", bus_id: "" });

  useEffect(() => {
    fetchRoutelines();
  }, []);

  const fetchRoutelines = async () => {
    try {
      const response = await fetch("http://localhost:5000/routelines");
      if (!response.ok) throw new Error("Failed to fetch routelines");
      const data = await response.json();
      setRoutelines(data);
    } catch (error) {
      console.error("Error fetching routelines:", error);
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
      const response = await fetch("http://localhost:5000/routelines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRouteline),
      });
      if (!response.ok) throw new Error("Failed to add routeline");
      const data = await response.json();
      setRoutelines([...routelines, data]);
      setNewRouteline({ name: "", bus_id: "" });
    } catch (error) {
      console.error("Error adding routeline:", error);
    }
  };

  const updateRouteline = async () => {
    try {
      const response = await fetch(`http://localhost:5000/routelines/${editRouteline.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRouteline),
      });
      if (!response.ok) throw new Error("Failed to update routeline");
      fetchRoutelines();
      setEditRouteline({ id: null, name: "", bus_id: "" });
    } catch (error) {
      console.error("Error updating routeline:", error);
    }
  };

  const deleteRouteline = async (id) => {
    if (!window.confirm("Are you sure you want to delete this routeline?")) return;
    try {
      const response = await fetch(`http://localhost:5000/routelines/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete routeline");
      fetchRoutelines();
    } catch (error) {
      console.error("Error deleting routeline:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Routelines</h1>

      <div style={styles.formContainer}>
        <h2>Add Routeline</h2>
        <input
          type="text"
          name="name"
          placeholder="Routeline Name"
          value={newRouteline.name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="number"
          name="bus_id"
          placeholder="Bus ID"
          value={newRouteline.bus_id}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button
          style={styles.button}
          onClick={addRouteline}
          disabled={!newRouteline.name || !newRouteline.bus_id}
        >
          Add Routeline
        </button>
      </div>

      {editRouteline.id && (
        <div style={styles.formContainer}>
          <h2>Edit Routeline</h2>
          <input
            type="text"
            name="name"
            placeholder="Routeline Name"
            value={editRouteline.name}
            onChange={handleEditInputChange}
            style={styles.input}
          />
          <input
            type="number"
            name="bus_id"
            placeholder="Bus ID"
            value={editRouteline.bus_id}
            onChange={handleEditInputChange}
            style={styles.input}
          />
          <button style={styles.button} onClick={updateRouteline}>
            Update Routeline
          </button>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bus ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routelines.map((routeline) => (
            <tr key={routeline.id}>
              <td>{routeline.name}</td>
              <td>{routeline.bus_id}</td>
              <td>
                <button
                  style={styles.editButton}
                  onClick={() => setEditRouteline(routeline)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteRouteline(routeline.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline Styles
const styles = {
  container: { maxWidth: "600px", margin: "auto", textAlign: "center" },
  formContainer: { marginBottom: "20px" },
  input: { padding: "10px", margin: "5px", width: "40%" },
  button: { padding: "10px", margin: "5px", background: "green", color: "white", border: "none", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  editButton: { padding: "5px 10px", margin: "5px", background: "blue", color: "white", border: "none", cursor: "pointer" },
  deleteButton: { padding: "5px 10px", margin: "5px", background: "red", color: "white", border: "none", cursor: "pointer" },
};

export default Routelines;
