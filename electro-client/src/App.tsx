import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Client from './pages/Client';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import AddressManager from './pages/AddressManager';
import ProvinceManager, { ProvinceCreate, ProvinceUpdate } from 'pages/province';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <Routes>
            <Route path="/" element={<Client/>}/>
            <Route path="/admin" element={<Admin/>}>
              <Route index element={<AdminDashboard/>}/>
              <Route path="address" element={<AddressManager/>}/>
              <Route path="address/province" element={<ProvinceManager/>}/>
              <Route path="address/province/create" element={<ProvinceCreate/>}/>
              <Route path="address/province/update/:entityId" element={<ProvinceUpdate/>}/>
            </Route>
          </Routes>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
