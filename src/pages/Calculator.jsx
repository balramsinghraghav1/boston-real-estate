import React, { useState, useEffect } from "react";
import * as ort from "onnxruntime-web";
import bg from "../assets/web_bg2.png";

export default function Calculator() {
  const fields = [
    "CRIM","ZN","INDUS","CHAS","NOX",
    "RM","AGE","DIS","RAD","TAX",
    "PTRATIO","B","LSTAT"
  ];

  const [vals, setVals] = useState(Array(13).fill(""));
  const [pred, setPred] = useState(null);
  const [session, setSession] = useState(null);

  // Load ONNX model ONCE
  useEffect(() => {
    async function loadModel() {
      try {
        const s = await ort.InferenceSession.create("/model.onnx"); 
        setSession(s);
      } catch (err) {
        console.error("ONNX LOAD ERROR:", err);
        alert("Model load failed. Check console.");
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

    const input = Float32Array.from(vals.map(v => Number(v) || 0));

    const tensor = new ort.Tensor("float32", input, [1, 13]);

    try {
      const result = await session.run({ input: tensor });
      const output = result.output.data[0];

      setPred(output.toFixed(2));
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
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
          {fields.map((f, i) => (
            <div key={i}>
              <label style={{ fontWeight: 600 }}>{f}</label>
              <input
                type="number"
                value={vals[i]}
                onChange={(e) => update(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button onClick={calculate} style={{ marginTop: 20, width: "100%" }}>
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


