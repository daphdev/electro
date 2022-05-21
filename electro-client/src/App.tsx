import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Client from './pages/Client';
import Admin from './pages/Admin';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Routes>
          <Route path="/" element={<Client/>}/>
          <Route path="admin" element={<Admin/>}/>
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
