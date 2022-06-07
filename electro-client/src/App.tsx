import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'dayjs/locale/vi';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import './App.css';
import Client from './pages/Client';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import AddressManage from 'pages/address/AddressManage';
import ProvinceManage, { ProvinceCreate, ProvinceUpdate } from 'pages/province';
import { ModalsProvider } from '@mantine/modals';
import ManagerPath from 'constants/ManagerPath';
import { DistrictCreate } from 'pages/district';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <ModalsProvider>
            <Routes>
              <Route path="/" element={<Client/>}/>
              <Route path="/admin" element={<Admin/>}>
                <Route index element={<AdminDashboard/>}/>
                <Route path={ManagerPath.ADDRESS} element={<AddressManage/>}/>
                <Route path={ManagerPath.PROVINCE} element={<ProvinceManage/>}/>
                <Route path={ManagerPath.PROVINCE + '/create'} element={<ProvinceCreate/>}/>
                <Route path={ManagerPath.PROVINCE + '/update/:id'} element={<ProvinceUpdate/>}/>

                <Route path={ManagerPath.DISTRICT + '/create'} element={<DistrictCreate/>}/>
              </Route>
            </Routes>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
