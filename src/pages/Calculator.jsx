import React, { useState } from "react";
import bg from "../assets/web_bg2.png";

export default function Calculator() {
  // 13 Boston dataset features with clear/explained labels
  const fields = [
    { key: "crim", label: "CRIM – Per capita crime rate by town" },
    { key: "zn", label: "ZN – Proportion of residential land zoned for large lots" },
    { key: "indus", label: "INDUS – Proportion of non-retail business acres per town" },
    { key: "chas", label: "CHAS – Charles River dummy (1 if near river)" },
    { key: "nox", label: "NOX – Nitric oxide concentration (parts per 10M)" },
    { key: "rm", label: "RM – Avg number of rooms per dwelling" },
    { key: "age", label: "AGE – Age of previous owner homes (%)" },
    { key: "dis", label: "DIS – Distance to 5 employment centers" },
    { key: "rad", label: "RAD – Accessibility to radial highways" },
    { key: "tax", label: "TAX – Full-value property-tax rate" },
    { key: "ptratio", label: "PTRATIO – Pupil–teacher ratio by town" },
    { key: "b", label: "B – 1000*(Bk - 0.63)^2 (ethnicity proportion)" },
    { key: "lstat", label: "LSTAT – Lower status population (%)" },
  ];

  // form values
  const [vals, setVals] = useState(Array(13).fill(""));
  const [pred, setPred] = useState(null);

  // Example model (dummy coefficients)
  // Replace these with actual model weights if needed
  const coef = [0.2, 0.02, -0.1, 2.5, -17.0, 3.5, -0.01, -1.3, 0.5, -0.01, -1.0, 0.01, -0.6];
  const intercept = 30.0;

  const update = (index, value) => {
    const arr = [...vals];
    arr[index] = value;
    setVals(arr);
  };

  // Local JavaScript prediction
  const calculate = () => {
    let x = vals.map((v) => Number(v) || 0);
    let result = intercept;

    for (let i = 0; i < 13; i++) result += coef[i] * x[i];

    setPred(result.toFixed(2));
  };

  return (
    <div
      className="page-wrapper"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2>Boston Housing Price Calculator</h2>

      <div
        className="glass-card"
        style={{
          maxWidth: "900px",
          margin: "auto",
          marginTop: 25,
        }}
      >
        <p style={{ marginBottom: 20 }}>
          Enter all 13 Boston Housing dataset parameters.  
          These values will be processed with a local model to estimate **MEDV (house price in $1000s)**.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {fields.map((f, i) => (
            <div key={f.key} style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  marginBottom: 6,
                  fontWeight: 600,
                  opacity: 0.9,
                  fontSize: 14,
                }}
              >
                {i + 1}. {f.label}
              </label>
              <input
                type="number"
                placeholder={`Enter ${f.key}`}
                value={vals[i]}
                onChange={(e) => update(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={calculate}
          style={{ marginTop: 30, width: "100%" }}
        >
          Calculate Price
        </button>

        {pred !== null && (
          <div
            className="glass-card"
            style={{
              marginTop: 20,
              padding: 20,
              textAlign: "center",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Estimated Price (MEDV):  
            <span style={{ color: "#ffd369", marginLeft: 10 }}>
              {pred} × $1000
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
