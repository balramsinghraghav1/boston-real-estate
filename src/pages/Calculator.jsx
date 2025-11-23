import React, { useState } from "react";
import * as ort from "onnxruntime-web"; 
import bg from "../assets/web_bg2.png";

/*
 Order of features:
 ["CRIM","ZN","INDUS","CHAS","NOX","RM","AGE","DIS","RAD","TAX","PTRATIO","B","LSTAT"]
*/

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

export default function Calculator() {
  const [inputVals, setInputVals] = useState(Array(13).fill(""));
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateInput = (i, v) => {
    const arr = [...inputVals];
    arr[i] = v;
    setInputVals(arr);
  };

  // Run ONNX model
  const runONNX = async () => {
    try {
      setLoading(true);
      const session = await ort.InferenceSession.create("/model.onnx");

      // Convert inputs to float32 tensor
      const inputTensor = new ort.Tensor(
        "float32",
        Float32Array.from(inputVals.map((v) => parseFloat(v) || 0)),
        [1, 13]
      );

      const outputs = await session.run({ input: inputTensor });
      const predictedValue = outputs.output.data[0];

      setPrediction(predictedValue.toFixed(2));
      setLoading(false);
    } catch (e) {
      console.error(e);
      alert("Model load failed. Check console.");
      setLoading(false);
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <h2>Boston Housing Price Calculator (ONNX Model)</h2>

      <div className="glass-card" style={{ maxWidth: 900, margin: "auto" }}>
        <p>Prediction (MEDV): Value is in $1000 units.</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          {fields.map((f, i) => (
            <div key={i}>
              <label style={{ fontWeight: 600 }}>
                {i + 1}. {f.label}
              </label>
              <input
                type="number"
                placeholder={f.key}
                value={inputVals[i]}
                onChange={(e) => updateInput(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={runONNX}
          style={{ marginTop: 25, width: "100%" }}
          disabled={loading}
        >
          {loading ? "Calculating..." : "Predict Price"}
        </button>

        {prediction !== null && (
          <div className="glass-card" style={{ marginTop: 20, textAlign: "center" }}>
            <h3>
              Estimated MEDV:{" "}
              <span style={{ color: "#ffd369" }}>{prediction} × $1000</span>
            </h3>
            <p style={{ fontSize: 12, opacity: 0.7 }}>
              Model Loaded: ONNX Runtime Web
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

