import React, { useState, useEffect } from "react";
import bg from "../assets/web_bg2.png";
import * as ort from "onnxruntime-web";

/*
 Order of features:
 ["CRIM","ZN","INDUS","CHAS","NOX","RM","AGE","DIS","RAD","TAX","PTRATIO","B","LSTAT"]
*/

export default function Calculator() {
  const fields = [
    { key: "crim", label: "CRIM – Per capita crime rate by town" },
    { key: "zn", label: "ZN – Proportion of residential land zoned for large lots" },
    { key: "indus", label: "INDUS – Non-retail business acres per town" },
    { key: "chas", label: "CHAS – Charles River dummy (0 or 1)" },
    { key: "nox", label: "NOX – Nitric oxides concentration" },
    { key: "rm", label: "RM – Average number of rooms" },
    { key: "age", label: "AGE – Age of owner-occupied homes" },
    { key: "dis", label: "DIS – Distance to employment centers" },
    { key: "rad", label: "RAD – Radial highway access index" },
    { key: "tax", label: "TAX – Property tax rate" },
    { key: "ptratio", label: "PTRATIO – Pupil-teacher ratio" },
    { key: "b", label: "B – 1000(Bk - 0.63)^2" },
    { key: "lstat", label: "LSTAT – % lower status population" }
  ];

  const [vals, setVals] = useState(Array(13).fill(""));
  const [pred, setPred] = useState(null);
  const [session, setSession] = useState(null);

  // 🔥 Load ONNX model once
  useEffect(() => {
    async function loadModel() {
      const loaded = await ort.InferenceSession.create("/src/model/model.onnx");
      setSession(loaded);
    }
    loadModel();
  }, []);

  const update = (index, v) => {
    const arr = [...vals];
    arr[index] = v;
    setVals(arr);
  };

  const calculate = async () => {
    if (!session) {
      alert("Model not loaded yet...");
      return;
    }

    // Convert inputs → float32
    const input = Float32Array.from(vals.map((v) => Number(v) || 0));

    // Create ONNX tensor
    const tensor = new ort.Tensor("float32", input, [1, 13]);

    // Run model
    const output = await session.run({ input: tensor });

    // Your model output name may be "output" or something else
    const predValue = output.output.data[0];

    setPred(predValue.toFixed(2));
  };

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${bg})` }}>
      <h2>Boston Housing Price Calculator (ONNX Model)</h2>
      <div className="glass-card" style={{ maxWidth: 900, margin: "auto", marginTop: 25 }}>
        <p>Enter the 13 Boston Housing features (numbers). The ONNX model will estimate the MEDV value.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {fields.map((f, i) => (
            <div key={i}>
              <label style={{ fontWeight: 600 }}>{i + 1}. {f.label}</label>
              <input
                type="number"
                value={vals[i]}
                onChange={(e) => update(i, e.target.value)}
                placeholder={f.key}
                style={{ marginTop: 6 }}
              />
            </div>
          ))}
        </div>

        <button onClick={calculate} style={{ marginTop: 20, width: "100%" }}>
          Predict Price
        </button>

        {pred !== null && (
          <div className="glass-card" style={{ marginTop: 18, textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              Estimated Price: <span style={{ color: "#ffd369" }}>{pred} × $1000/-</span>
            </div>
            <div style={{ fontSize: 13, marginTop: 6, color: "#ddd" }}>
              Model: ONNX Runtime Web (High Accuracy)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

