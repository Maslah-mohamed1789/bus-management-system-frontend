import React, { useState, useEffect } from "react";

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [name, setName] = useState("");
  const [busId, setBusId] = useState("");

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/passengers");
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
      const response = await fetch("http://localhost:5000/api/passengers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bus_id: Number(busId) }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      setName("");
      setBusId("");
      fetchPassengers();
    } catch (error) {
      console.error("Error adding passenger:", error);
    }
  };

  const deletePassenger = async (id) => {
    if (!window.confirm("Are you sure you want to delete this passenger?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/passengers/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      fetchPassengers();
    } catch (error) {
      console.error("Error deleting passenger:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Passengers</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Passenger Name"
          style={styles.input}
        />
        <input
          type="number"
          value={busId}
          onChange={(e) => setBusId(Number(e.target.value))}
          placeholder="Bus ID"
          style={styles.input}
        />
        <button style={styles.button} onClick={addPassenger} disabled={!name || !busId}>
          Add Passenger
        </button>
      </div>

      {passengers.length === 0 ? (
        <p>No passengers available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Bus ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.id}>
                <td>{passenger.id}</td>
                <td>{passenger.name}</td>
                <td>{passenger.bus_id}</td>
                <td>
                  <button style={styles.deleteButton} onClick={() => deletePassenger(passenger.id)}>
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
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  deleteButton: { padding: "5px 10px", margin: "5px", background: "red", color: "white", border: "none", cursor: "pointer" },
};

export default Passengers;
