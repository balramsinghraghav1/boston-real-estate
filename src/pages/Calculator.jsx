import React, { useState } from "react";
import bg from "../assets/web_bg.png";

/*
 Order of features (you specified):
 ["CRIM","ZN","INDUS","CHAS","NOX","RM","AGE","DIS","RAD","TAX","PTRATIO","B","LSTAT"]
*/

export default function Calculator() {
  const fields = [
    { key: "crim", label: "CRIM – Per capita crime rate by town" },
    { key: "zn", label: "ZN – Proportion of residential land zoned for large lots" },
    { key: "indus", label: "INDUS – Proportion of non-retail business acres per town" },
    { key: "chas", label: "CHAS – Charles River dummy (1 if tract bounds river)" },
    { key: "nox", label: "NOX – Nitric oxides concentration (parts per 10 million)" },
    { key: "rm", label: "RM – Average number of rooms per dwelling" },
    { key: "age", label: "AGE – Proportion of owner-occupied units built prior to 1940 (age of previous owners homes)" },
    { key: "dis", label: "DIS – Weighted distances to five Boston employment centres" },
    { key: "rad", label: "RAD – Index of accessibility to radial highways" },
    { key: "tax", label: "TAX – Full-value property-tax rate per $10,000" },
    { key: "ptratio", label: "PTRATIO – Pupil-teacher ratio by town" },
    { key: "b", label: "B – 1000(Bk - 0.63)^2 where Bk is proportion of blacks by town" },
    { key: "lstat", label: "LSTAT – % lower status of the population" }
  ];

  // --- coefficients extracted from your uploaded .pkl (float32)
  const coef = [
    -0.1130559239853785,
     0.030110464145648098,
     0.0403807204133406,
     2.784438203507955,
   -17.202633391781642,
     4.438835199513027,
    -0.006296362210981938,
    -1.4478653685307887,
     0.26242973558508875,
    -0.010646786275308323,
    -0.915456240468072,
     0.012351334729969108,
    -0.5085714244487981
  ];

  // intercept from your model
  const intercept = 30.246750993924028;

  const [vals, setVals] = useState(Array(13).fill(""));
  const [pred, setPred] = useState(null);

  const update = (index, value) => {
    const arr = [...vals];
    arr[index] = value;
    setVals(arr);
  };

  const calculate = () => {
    // convert to numbers, same order as coef
    const x = vals.map(v => Number(v) || 0);
    let result = intercept;
    for (let i = 0; i < coef.length; i++) {
      result += coef[i] * x[i];
    }
    // same unit as MEDV (thousands)
    setPred(result.toFixed(2));
  };

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${bg})` }}>
      <h2>Boston Housing Price Calculator</h2>
      <div className="glass-card" style={{ maxWidth: 900, margin: "auto", marginTop: 25 }}>
        <p>Enter the 13 Boston Housing features (numbers). Prediction = MEDV (price in $1000s).</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {fields.map((f, i) => (
            <div key={f.key}>
              <label style={{ fontWeight: 600 }}>{i+1}. {f.label}</label>
              <input
                type="number"
                placeholder={f.key}
                value={vals[i]}
                onChange={e => update(i, e.target.value)}
                style={{ marginTop: 6 }}
              />
            </div>
          ))}
        </div>

        <button onClick={calculate} style={{ marginTop: 20, width: "100%" }}>Calculate Price</button>

        {pred !== null && (
          <div className="glass-card" style={{ marginTop: 18, textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Estimated MEDV: <span style={{ color: "#ffd369" }}>{pred} × $1000</span></div>
            <div style={{ fontSize: 13, marginTop: 6, color: "#ddd" }}>Model: sklearn LinearRegression (from uploaded .pkl)</div>
          </div>
        )}
      </div>
    </div>
  );
}

