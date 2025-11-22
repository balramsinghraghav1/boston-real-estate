import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div>
      <section className="hero">
        <div className="overlay">
          <h1 style={{fontSize:48,margin:0}}>Boston Real Estate</h1>
          <p style={{fontSize:18,marginTop:8}}>Your Exclusive Gateway to Premier Properties</p>
          <div style={{marginTop:12}}>
            <Link to="/properties" className="btn">Explore Properties</Link>
            <Link to="/calculator" className="btn" style={{marginLeft:12, background:'#333'}}>Calculator</Link>
          </div>
        </div>
      </section>
      <div className="content-card">
        <h2>About the platform</h2>
        <p>Boston Real Estate connects buyers and dealers with real-time property listings and an AI price estimation tool.</p>
      </div>
    </div>
  )
}
