
import React,{useState} from 'react';

// Coefficients and intercept extracted from your model
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

const FIELDS = ['CRIM','ZN','INDUS','CHAS','NOX','RM','AGE','DIS','RAD','TAX','PTRATIO','B','LSTAT'];

export default function Calculator(){
  const [vals,setVals] = useState(Array(13).fill(''));
  const [result,setResult] = useState(null);

  const setAt = (i,v)=>{ const c=[...vals]; c[i]=v; setVals(c); };

  const calculate = ()=>{
    const nums = vals.map(v=>parseFloat(v) || 0);
    let sum = INTERCEPT;
    for(let i=0;i<13;i++) sum += COEFS[i] * nums[i];
    // MEDV in thousands? original dataset is in $1000s; convert to rupees approx or show raw
    const medv = Math.round(sum * 1000); // raw in dollars *1000
    setResult(medv);
  };

  return (<div className="card" style={{maxWidth:900}}>
    <h2>Boston Housing Calculator</h2>
    <p className="note">Enter the 13 features from BostonHousing dataset (CRIM → LSTAT). Prediction (MEDV) is shown below.</p>
    <div className="calc-grid">
      {FIELDS.map((f,i)=>(<div key={f} className="calc-input"><label>{f}</label><input value={vals[i]} onChange={e=>setAt(i,e.target.value)} placeholder={f} /></div>))}
    </div>
    <div className="center mt"><button onClick={calculate}>Calculate MEDV</button></div>
    {result!==null && <div className="card mt"><h3>Predicted MEDV: {result.toLocaleString()} (units: dataset units ×1000)</h3></div>}
  </div>);
}
