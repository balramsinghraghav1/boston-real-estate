import React, {useState} from 'react'
export default function Calculator(){
  // 13 features names with explanation
  const featuresMeta = [
    {key:'crim', label:'CRIM - Per capita crime rate by town'},
    {key:'zn', label:'ZN - Proportion of residential land zoned for lots over 25,000 sq.ft.'},
    {key:'indus', label:'INDUS - Proportion of non-retail business acres per town'},
    {key:'chas', label:'CHAS - Charles River dummy variable (1 if tract bounds river)'},
    {key:'nox', label:'NOX - Nitric oxides concentration (parts per 10 million)'},
    {key:'rm', label:'RM - Average number of rooms per dwelling'},
    {key:'age', label:'AGE - Proportion of owner-occupied units built prior to 1940 (age of previous owners homes)'},
    {key:'dis', label:'DIS - Weighted distances to five Boston employment centres'},
    {key:'rad', label:'RAD - Index of accessibility to radial highways'},
    {key:'tax', label:'TAX - Full-value property-tax rate per $10,000'},
    {key:'ptratio', label:'PTRATIO - Pupil-teacher ratio by town'},
    {key:'b', label:'B - 1000(Bk - 0.63)^2 where Bk is proportion of blacks by town'},
    {key:'lstat', label:'LSTAT - % lower status of the population'}
  ];
  const [vals, setVals] = useState(Array(13).fill(''));
  const [pred, setPred] = useState(null);

  // example coefficients exported from model (placeholder — replace with real model's coefficients)
  const coef = [0.2,0.02, -0.1, 2.5, -17.0, 3.5, -0.01, -1.3, 0.5, -0.01, -1.0, 0.01, -0.6];
  const intercept = 30.0;

  const handleChange = (i,v)=>{ const arr = [...vals]; arr[i]=v; setVals(arr) }

  const calculate = ()=>{
    const x = vals.map(v=>Number(v)||0);
    let s = intercept;
    for(let i=0;i<13;i++) s += coef[i]*x[i];
    setPred((s).toFixed(2));
  }

  return (
    <div>
      <div className="subpage-bg"></div>
      <h2>Boston Price Calculator</h2>
      <p>Enter 13 numeric features. Labels show full name and explanation.</p>
      <div className="content-card">
        <div className="calc-grid">
          {featuresMeta.map((f,i)=>(
            <div className="input" key={f.key}>
              <label>{i+1}. {f.label}</label>
              <input value={vals[i]} onChange={e=>handleChange(i,e.target.value)} placeholder={f.key} />
            </div>
          ))}
        </div>
        <div style={{marginTop:12}}>
          <button className="btn" onClick={calculate}>Calculate Price</button>
          {pred!==null && <div style={{marginTop:12}}>Estimated MEDV: <strong>{pred} (x1000)</strong></div>}
        </div>
      </div>
    </div>
  )
}
