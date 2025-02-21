import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const BACKEND_URL = "https://fastapi-example-w7al.onrender.com/bfhl";  // Update with your API

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" }
  ];

  const handleSubmit = async () => {
    try {
      // const parsedInput = JSON.parse(jsonInput);
      // if (!parsedInput.data) throw new Error("Invalid JSON format");

      const res = await axios.post(BACKEND_URL, jsonInput);
      axios.AxiosHeaders = {
        "Content-Type": "application/json",
      };
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON format or server error");
      setResponse(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <input
        type="text"
        placeholder='Enter JSON e.g. { "data": ["A","C","z"] }'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        style={{ width: "60%", padding: "10px", margin: "10px" }}
      />
      <button onClick={handleSubmit} style={{ padding: "10px" }}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <>
          <Select
            options={options}
            isMulti
            onChange={setSelectedFilters}
            placeholder="Select filters"
            style={{ width: "60%", margin: "10px auto" }}
          />
          <div style={{ marginTop: "20px" }}>
            {selectedFilters.map((filter) => (
              <p key={filter.value}>
                <b>{filter.label}:</b> {JSON.stringify(response[filter.value])}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
