import React, { useState, useEffect } from "react";
import * as ort from "onnxruntime-web";
import bg from "../assets/web_bg.png";

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

  // ---------------------------
  // LOAD ONNX MODEL
  // ---------------------------
  useEffect(() => {
    async function loadModel() {
      try {
        ort.env.wasm.wasmPaths =
          "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

        const s = await ort.InferenceSession.create("/model.onnx");
        setSession(s);
      } catch (err) {
        console.error("ONNX load error:", err);
        alert("Model load failed. Check console.");
      }
    }
    loadModel();
  }, []);

  const update = (i, val) => {
    const copy = [...vals];
    copy[i] = val;
    setVals(copy);
  };

  // ---------------------------
  // RUN INFERENCE
  // ---------------------------
  async function calculate() {
    if (!session) {
      alert("Model still loading...");
      return;
    }

    const inputArr = Float32Array.from(
      vals.map(v => parseFloat(v) || 0)
    );

    const tensor = new ort.Tensor("float32", inputArr, [1, 13]);

    const output = await session.run({ input: tensor });
    const value = output.output.data[0];

    setPred(value);
  }

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${bg})` }}>
      <h2>Boston Housing Price Calculator</h2>

      <div className="glass-card" style={{ maxWidth: 900, margin: "auto", marginTop: 25 }}>
        <p>Enter the 13 Boston Housing features to get the predicted price.</p>

        <div className="calc-grid">
          {FIELDS.map((f, i) => (
            <div key={i} className="calc-input">
              <label>{f}</label>
              <input
                type="number"
                value={vals[i]}
                placeholder={f}
                onChange={(e) => update(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button onClick={calculate} style={{ width: "100%", marginTop: 20 }}>
          Predict Price
        </button>

        {pred !== null && (
          <div className="glass-card" style={{ marginTop: 20, padding: 20 }}>
            <h3>Predicted MEDV: {pred.toFixed(2)}</h3>
            <p style={{ opacity: 0.7 }}>(Value is in dataset units × 1000)</p>
          </div>
        )}
      </div>
    </div>
  );
}

