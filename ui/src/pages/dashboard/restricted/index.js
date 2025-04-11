// src/pages/Forbidden.js
import React from 'react';
import { Link } from 'react-router-dom';

function Forbidden() {
  const style = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }
  return (
    <div style={ style }>
      <h1 style={ { fontSize: '4rem', color: '#ff4d4f' } }>403</h1>
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      <br />
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
}

export default Forbidden;
