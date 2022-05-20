import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Client from "./pages/Client";
import Admin from "./pages/Admin";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Client/>}/>
                <Route path="admin" element={<Admin/>}/>
                <Route path="test" element={<Admin/>}/>
            </Routes>
        </div>
    );
}
