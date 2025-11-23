import React, { useState, useEffect } from "react";
import * as ort from "onnxruntime-web";
import bg from "../assets/web_bg2.png"; 

export default function Calculator() {
  const fields = [
    { key: "crim", label: "CRIM – Per capita crime rate by town" },
    { key: "zn", label: "ZN – Land zoned for large lots" },
    { key: "indus", label: "INDUS – Non-retail business acres" },
    { key: "chas", label: "CHAS – Charles River dummy (0/1)" },
    { key: "nox", label: "NOX – Nitrogen oxide concentration" },
    { key: "rm", label: "RM – Avg rooms per house" },
    { key: "age", label: "AGE – Old homes proportion (%)" },
    { key: "dis", label: "DIS – Employment distance index" },
    { key: "rad", label: "RAD – Highway accessibility index" },
    { key: "tax", label: "TAX – Property tax rate" },
    { key: "ptratio", label: "PTRATIO – Student-teacher ratio" },
    { key: "b", label: "B – Demographic factor" },
    { key: "lstat", label: "LSTAT – % lower status population" }
  ];

  const [vals, setVals] = useState(Array(13).fill(""));
  const [pred, setPred] = useState(null);
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("Loading model...");

  useEffect(() => {
    async function loadModel() {
      try {
        // --- v1.18.0 CONFIGURATION ---
        
        // 1. Disable Proxy (Reliability fix for Vercel)
        ort.env.wasm.proxy = false;

        // 2. Point to the file in your public folder
        ort.env.wasm.wasmPaths = {
          'ort-wasm-simd.wasm': '/ort-wasm-simd.wasm'
        };

        // 3. Load Model
        const s = await ort.InferenceSession.create("/model.onnx");
        setSession(s);
        setStatus("Ready to Calculate");
        console.log("Model loaded successfully!");

      } catch (err) {
        console.error("ONNX LOAD ERROR:", err);
        setStatus(`Error: ${err.message}`);
        // This alerts the exact error if it fails
        alert(`Model load failed: ${err.message}`); 
      }
    }
    loadModel();
  }, []);

  const update = (i, v) => {
    const copy = [...vals];
    copy[i] = v;
    setVals(copy);
  };

  const calculate = async () => {
    if (!session) return alert("Model not loaded yet!");

    const inputData = Float32Array.from(vals.map(v => Number(v) || 0));
    const tensor = new ort.Tensor("float32", inputData, [1, 13]);

    try {
      const feeds = {};
      const inputName = session.inputNames[0];
      feeds[inputName] = tensor;

      const result = await session.run(feeds);
      const outputName = session.outputNames[0];
      const output = result[outputName].data[0];

      setPred(output.toFixed(2));
    } catch (err) {
      console.error("PREDICTION ERROR:", err);
      alert(`Prediction failed: ${err.message}`);
    }
  };

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${bg})` }}>
      <h2>Boston Price Calculator (ONNX Model)</h2>

      <div style={{ textAlign: "center", color: session ? "#4caf50" : "#f44336", fontWeight: "bold", marginBottom: 10 }}>
        Status: {status}
      </div>

      <div className="glass-card" style={{ maxWidth: 900, margin: "auto" }}>
        <p>Enter the 13 Boston Housing features below.</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20
        }}>
          {fields.map((field, i) => (
            <div key={field.key}>
              <label style={{ fontWeight: 600, display: "block", marginBottom: 5 }}>
                {field.label}
              </label>
              <input
                type="number"
                value={vals[i]}
                onChange={(e) => update(i, e.target.value)}
                placeholder="0"
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
          ))}
        </div>

        <button onClick={calculate} style={{ marginTop: 20, width: "100%", padding: "10px", fontWeight: "bold", cursor: "pointer" }}>
          Calculate Price
        </button>

        {pred !== null && (
          <div className="glass-card" style={{ marginTop: 18, textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              Predicted MEDV: <span style={{ color: "#ffd369" }}>{pred}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}