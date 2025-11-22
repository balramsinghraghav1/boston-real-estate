import React, { useState } from "react";
import bg from "../assets/web_bg2.png";

// Coefficients and intercept extracted from your LinearRegression model
const COEFS = [
  -0.113055924,
   0.0301104641,
   0.0403807204,
   2.78443820,
  -17.2026334,
   4.43883520,
  -0.00629636221,
  -1.44786537,
   0.262429736,
  -0.0106467863,
  -0.915456240,
   0.0123513347,
  -0.508571424
];

const INTERCEPT = 30.246750993924028;

const FIELDS = [
  "CRIM", "ZN", "INDUS", "CHAS", "NOX", "RM",
  "AGE", "DIS", "RAD", "TAX", "PTRATIO", "B", "LSTAT"
];

export default function Calculator() {

  const [vals, setVals] = useState(Array(13).fill(""));
  const [result, setResult] = useState(null);

  const update = (i, v) => {
    const copy = [...vals];
    copy[i] = v;
    setVals(copy);
  };

  const calculate = () => {
    const arr = vals.map(v => parseFloat(v) || 0);

    let medv = INTERCEPT;
    for (let i = 0; i < 13; i++) medv += COEFS[i] * arr[i];

    // MEDV is in $1000 units → We show simply the predicted MEDV*1000
    setResult(Math.round(medv * 1000));
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(12px)",
        paddingBottom: "50px"
      }}
    >
      <h2 style={{ marginBottom: 14 }}>Boston Housing Calculator</h2>

      <div
        className="glass-card"
        style={{
          maxWidth: 900,
          margin: "auto",
          marginTop: 25,
          padding: 25
        }}
      >
        <p style={{ marginBottom: 18 }}>
          Enter the 13 Boston Housing dataset features (CRIM → LSTAT).  
          Output: <b>Predicted MEDV × 1000</b>
        </p>

        {/* Input Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: 20
          }}
        >
          {FIELDS.map((f, i) => (
            <div key={f} className="calc-input">
              <label style={{ fontWeight: 600 }}>{f}</label>
              <input
                type="number"
                value={vals[i]}
                placeholder={f}
                onChange={(e) => update(i, e.target.value)}
                style={{ marginTop: 6 }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={calculate}
          style={{
            marginTop: 20,
            width: "100%",
            fontSize: 16
          }}
        >
          Calculate MEDV
        </button>

        {result !== null && (
          <div className="glass-card" style={{ marginTop: 22, textAlign: "center" }}>
            <h3>
              Predicted MEDV:{" "}
              <span style={{ color: "#ffd369" }}>
                {result.toLocaleString()}
              </span>
            </h3>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              (MEDV × 1000, based on sklearn LinearRegression)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

