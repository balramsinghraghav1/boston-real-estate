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

  // Load ONNX model ONCE
  useEffect(() => {
    async function loadModel() {
      try {
        // --- CRITICAL FIX START ---
        
        // 1. Disable multi-threading (This stops it from looking for the missing .mjs/.wasm files)
        ort.env.wasm.numThreads = 1; 
        
        // 2. Disable proxy (Helps with stability on Vercel/Basic web hosts)
        ort.env.wasm.proxy = false;

        // 3. Point to the CDN for the standard (non-threaded) files
        // We use version 1.19.1 to match your package.json
        ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.19.1/dist/";
        
        // --- CRITICAL FIX END ---

        const s = await ort.InferenceSession.create("/model.onnx");
        setSession(s);
        console.log("Model loaded successfully");
      } catch (err) {
        console.error("ONNX LOAD ERROR:", err);
        alert("Model load failed. Check console for details.");
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
      alert("Prediction failed. Check console.");
    }
  };

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${bg})` }}>
      <h2>Boston Price Calculator (ONNX Model)</h2>

      <div className="glass-card" style={{ maxWidth: 900, margin: "auto", marginTop: 25 }}>
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
            <div style={{ fontSize: 13, marginTop: 6, color: "#ddd" }}>
              Powered by ONNX runtime-web
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
