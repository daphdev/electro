import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Client</Link> | <Link to="/admin">Admin</Link> | <Link to="/test">Test</Link>
      </nav>
      <h1>Admin Side</h1>
      <p><Button>Hello world!</Button></p>
    </div>
  )
}
