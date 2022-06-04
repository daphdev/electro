import React from 'react';
import { Link } from 'react-router-dom';

function Client() {
  return (
    <div>
      <nav>
        <Link to="/">Client</Link> | <Link to="/admin">Admin</Link> | <Link to="/test">Test</Link>
      </nav>
      <h1>Client Side</h1>
    </div>
  );
}

export default Client;
